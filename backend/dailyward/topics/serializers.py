from rest_framework import serializers
from django.core.cache import cache
from .models import Participant, Topic

class TopicSerializer(serializers.ModelSerializer):
    is_logged_in_user_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Topic
        fields = ['id', 'title', 'description', 'topic_image_url', 'created_at', 'code', 'is_logged_in_user_admin']
        read_only_fields = ['created_at', 'code', 'is_logged_in_user_admin']

    def get_is_logged_in_user_admin(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        return obj.participant_set.filter(user=request.user, role="admin").exists()

    def to_representation(self, instance):
        #get the default representation
        data = super().to_representation(instance)

        # Handle caching for topic_image_url
        if instance.topic_image_url:
           cache_key = f'topic_image_url_{instance.id}'
           cached_url = cache.get(cache_key)
           if cached_url:
               data['topic_image_url'] = cached_url
           else:
                url = instance.topic_image_url.url
                cache.set(cache_key, url, timeout=300)
                data['topic_image_url'] = url

        else:
            data['topic_image_url'] = None
        return data
        
class ParticipantSerializer(serializers.ModelSerializer):
    user_full_name = serializers.SerializerMethodField(read_only=True)
    user_profile_pic = serializers.SerializerMethodField(read_only=True)

    def get_user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    
    def get_user_profile_pic(self, obj):
        if obj.user.profile_pic_url:
            return obj.user.profile_pic_url.url
        return None
    
    def to_representation(self, instance):
        # Get the default representation
        data = super().to_representation(instance)
        
        # Handle caching for user_profile_pic
        if instance.user.profile_pic_url:
            cache_key = f'profile_pic_url_{instance.user.id}'
            cached_url = cache.get(cache_key)
            
            if cached_url:
                data['user_profile_pic'] = cached_url
            else:
                url = instance.user.profile_pic_url.url
                cache.set(cache_key, url, timeout=300)
                data['user_profile_pic'] = url
        else:
            data['user_profile_pic'] = None
            
        return data

    class Meta:
        model = Participant
        fields = ['id', 'user', 'role', 'joined_at', 'user_full_name', 'user_profile_pic']
        read_only_fields = ['joined_at', 'user', 'user_full_name', 'user_profile_pic']