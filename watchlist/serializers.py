
from rest_framework import serializers
from .models import Streamplatform,Watchlist,Reviews

class ReviewSerializer(serializers.ModelSerializer):
    reviewer=serializers.StringRelatedField()
    class Meta:
        model=Reviews
        fields="__all__"
        read_only_fields = ('review_user',)
        
class WatchlistSerializer(serializers.ModelSerializer):
    # movie=ReviewSerializer(many=True,read_only=True)
    class Meta:
        
        model=Watchlist
        fields="__all__"
        
        
class Streamplatform_serializer(serializers.ModelSerializer):
    
    class Meta:
        model=Streamplatform
        fields="__all__"
    watchlist=WatchlistSerializer(many=True,read_only=True)    
                
        
        
        
        