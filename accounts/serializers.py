from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Profile, DEFAULT_AVATAR


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    profile_picture = serializers.URLField(required=False, allow_blank=True, allow_null=True, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password', 'profile_picture']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        password1 = attrs.get('password')
        password2 = attrs.get('confirm_password')
        email = attrs.get('email')

        if password1 != password2:
            raise serializers.ValidationError("Both passwords don't match.")

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists.")

        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        profile_picture = validated_data.pop('profile_picture', '')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        profile, _ = Profile.objects.get_or_create(user=user)
        profile.profile_picture = profile_picture or f"{DEFAULT_AVATAR}?seed={user.username}"
        profile.save(update_fields=['profile_picture'])
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")
