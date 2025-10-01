from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    poster_name = serializers.CharField(source='posted_by.get_full_name', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'poster_name', 'content_text', 'created_at']
        read_only_fields = ['created_at', 'poster_name']