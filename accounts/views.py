from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login
from .serializers import RegisterSerializer,LoginSerializer
# Create your views here.
class RegisterAPI(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)   
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND) 
        
            

class LoginAPI(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data  # returned by validate()
            login(request, user)  # creates a session
            return Response(
                {"message": "Login successful!", "username": user.username},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                        
        