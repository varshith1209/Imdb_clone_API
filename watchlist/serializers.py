
from rest_framework import serializers
from .models import Streamplatform,Watchlist,Reviews,UserWatchlist

class ReviewSerializer(serializers.ModelSerializer):
    review_user = serializers.StringRelatedField(read_only=True)
    review_user_avatar = serializers.SerializerMethodField()

    class Meta:
        model=Reviews
        fields="__all__"
        read_only_fields = ('review_user', 'movie')

    def get_review_user_avatar(self, obj):
        user = getattr(obj, 'review_user', None)
        if not user:
            return None
        profile = getattr(user, 'profile', None)
        if profile and profile.profile_picture:
            return profile.profile_picture
        return f"https://api.dicebear.com/7.x/initials/svg?seed={user.username}"
        
class WatchlistSerializer(serializers.ModelSerializer):
    cast = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)

    class Meta:
        model=Watchlist
        fields="__all__"
        
        
class Streamplatform_serializer(serializers.ModelSerializer):
    watchlist = WatchlistSerializer(many=True, read_only=True)

    class Meta:
        model=Streamplatform
        fields = ['id', 'name', 'about', 'website', 'watchlist']


class UserWatchlistSerializer(serializers.ModelSerializer):
    movie = WatchlistSerializer(read_only=True)
    movie_id = serializers.PrimaryKeyRelatedField(source='movie', queryset=Watchlist.objects.all(), write_only=True)

    class Meta:
        model = UserWatchlist
        fields = ['id', 'movie', 'movie_id', 'added_on']
        read_only_fields = ['id', 'movie', 'added_on']
                
        
        
        
        