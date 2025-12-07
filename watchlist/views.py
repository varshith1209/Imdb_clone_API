from django.shortcuts import render
from rest_framework.response import Response
from .serializers import WatchlistSerializer,Streamplatform_serializer,ReviewSerializer,UserWatchlistSerializer
from .models import Watchlist,Streamplatform,Reviews,UserWatchlist
from rest_framework import status
from rest_framework import generics
from rest_framework import viewsets
from .permissions import AdminorReadonly
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.validators import ValidationError  
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAuthenticatedOrReadOnly
from rest_framework.decorators import permission_classes
from rest_framework.throttling import AnonRateThrottle,UserRateThrottle
from .throttling import ReviewThrottle
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.
class UserReview(generics.ListAPIView):
    filter_backends = [DjangoFilterBackend]
    permission_classes = [AllowAny] 
    serializer_class = ReviewSerializer

    def get_queryset(self):
        username = self.kwargs.get('username') or self.request.query_params.get('username')
        queryset = Reviews.objects.all()
        if username:
            queryset = queryset.filter(review_user__username=username)
        return queryset
    
class ReviewAPI(generics.ListCreateAPIView):
    # throttle_classes=[ReviewThrottle]
    serializer_class = ReviewSerializer
    permission_classes=[IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Reviews.objects.filter(movie_id=pk)

    def perform_create(self, serializer):
        pk = self.kwargs.get('pk')
        movie = get_object_or_404(Watchlist, pk=pk)
        user = self.request.user

        if Reviews.objects.filter(review_user=user, movie=movie).exists():
            raise ValidationError("You have already reviewed this movie.")

        rating = serializer.validated_data['rating']
        movie.avg_rating = (
            (movie.avg_rating * movie.number_rating) + rating
        ) / (movie.number_rating + 1)
        movie.number_rating += 1
        movie.save(update_fields=['avg_rating', 'number_rating'])

        serializer.save(movie=movie, review_user=user)
    
   
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        user = self.request.user
        movie_id = self.request.data.get('movie')  # comes from POST body
        movie = Watchlist.objects.get(pk=movie_id)

        # Prevent multiple reviews by the same user for the same movie
        existing_review = Reviews.objects.filter(movie=movie, review_user=user)
        if existing_review.exists():
            raise ValidationError("You have already reviewed this movie!")

        # Save the new review with current user and movie
        serializer.save(review_user=user, movie=movie)

        # Update the average rating
        if movie.number_rating == 0:
            movie.avg_rating = serializer.validated_data['rating']
        else:
            movie.avg_rating = (
                (movie.avg_rating * movie.number_rating) + serializer.validated_data['rating']
            ) / (movie.number_rating + 1)

        movie.number_rating += 1
        movie.save()
    
class Platform(viewsets.ViewSet):
    
   permission_classes=[AdminorReadonly] 
   def list(self, request):
        queryset=Streamplatform.objects.all()
        serializer = Streamplatform_serializer(queryset, many=True)
        return Response(serializer.data)

   def retrieve(self, request, pk=None):
        platform = get_object_or_404(Streamplatform, pk=pk)
        serializer = Streamplatform_serializer(platform)
        return Response(serializer.data)
    #def create  for the post an destroy for delete same func as APIVIEW
    
class WatchlistAPI(viewsets.ModelViewSet):
    
        # throttle_classes=[UserRateThrottle,AnonRateThrottle]
        permission_classes=[AdminorReadonly]
        queryset=Watchlist.objects.all()
        serializer_class=WatchlistSerializer


class UserWatchlistViewSet(viewsets.ModelViewSet):
        serializer_class = UserWatchlistSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
            return UserWatchlist.objects.filter(user=self.request.user).select_related('movie', 'movie__watchlist')

        def perform_create(self, serializer):
            movie = serializer.validated_data['movie']
            if UserWatchlist.objects.filter(user=self.request.user, movie=movie).exists():
                raise ValidationError("This title is already in your watchlist.")
            serializer.save(user=self.request.user)

        def destroy(self, request, *args, **kwargs):
            instance = self.get_object()
            if instance.user != request.user:
                raise ValidationError("You can only modify your own watchlist.")
            return super().destroy(request, *args, **kwargs)
# class Platform(generics.ListCreateAPIView):
#     queryset=Streamplatform.objects.all()
#     serializer_class=Streamplatform_serializer

# class Platformdetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset=Streamplatform.objects.all()
#     serializer_class=Streamplatform_serializer

# class WatchlistAPI(APIView):
#             def get(self,request):
#                 data=Watchlist.objects.all()
#                 serializer=WatchlistSerializer(data,many=True)
#                 return Response(serializer.data,status=status.HTTP_200_OK)
#             def post(self,request):
#                 serializer=WatchlistSerializer(data=request.data)
#                 if serializer.is_valid():
#                     serializer.save()
#                     return Response({'message':'Added successfully'},status=status.HTTP_201_CREATED)
#                 else:
#                    return Response({"messge": "Invalid Request"},status=status.HTTP_400_BAD_REQUEST)

                    
    
           