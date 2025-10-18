from django.db import models
from topics.models import Topic
from users.models import User

class Resource(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default='')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(blank=True, default='', null=False)
    created_at = models.DateTimeField(auto_now_add=True)

class ResourceFile(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name='files')
    file_url = models.FileField(upload_to='resources/')
    filename = models.CharField(max_length=255)
    file_size = models.BigIntegerField(blank=True, null=True)
    mime_type = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)