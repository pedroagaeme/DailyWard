from rest_framework import serializers
from django.core.cache import cache
from .models import Participant, Topic

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'description', 'topic_image_url', 'created_at', 'code']
        read_only_fields = ['created_at', 'code']

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
    user_profile_pic = serializers.ImageField(source='user.profile_pic', read_only=True)

    def get_user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    class Meta:
        model = Participant
        fields = ['id', 'user', 'role', 'joined_at', 'user_full_name', 'user_profile_pic']
        read_only_fields = ['joined_at', 'user', 'user_full_name', 'user_profile_pic']