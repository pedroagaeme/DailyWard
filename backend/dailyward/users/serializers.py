from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.core.cache import cache

class UserInfoSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(read_only=True)
    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'full_name', 'profile_pic_url']
        read_only_fields = ['id', 'full_name']

    def get_full_name(self, obj):
        return obj.get_full_name

    def to_representation(self, instance):
        #get the default representation
        data = super().to_representation(instance)

        # Handle caching for profile_pic_url
        if instance.profile_pic_url:
            cache_key = f'profile_pic_url_{instance.id}'
            cached_url = cache.get(cache_key)
            if cached_url:
                data['profile_pic_url'] = cached_url
            else:
                url = instance.profile_pic_url.url
                cache.set(cache_key, url, timeout=300)
                data['profile_pic_url'] = url
        else:
            data['profile_pic_url'] = None
            
        return data

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, write_only=True)
    confirm_password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'confirm_password', 'profile_pic_url']

    def validate(self, attrs):
        password = attrs.get('password', '')
        confirm_password = attrs.get('confirm_password', '')
        if password != confirm_password:
            raise serializers.ValidationError("passwords do not match")
        return attrs
    
    def create(self, validated_data):  
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            password=validated_data.get('password'),
        )
        return user
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'access_token', 'refresh_token']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request=request, email=email, password=password)

        if not user:
            raise AuthenticationFailed("invalid credentials")
        
        if not user.is_verified:
            raise AuthenticationFailed("email is not verified")
        
        user_tokens = user.tokens()
        
        return {
            'email': user.email,
            'full_name': user.get_full_name,
            'access_token': str(user_tokens.get('access')),
            'refresh_token': str(user_tokens.get('refresh'))
        }