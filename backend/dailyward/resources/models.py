from django.db import models
from topics.models import Topic
from users.models import User

# Create your models here.
CATEGORY_CHOICES = [
    ('announcement', 'Announcement'),
    ('file', 'File'),
    ('image', 'Image'),
    ('video', 'Video'),
]

class Resource(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    resource_type = models.CharField(choices=CATEGORY_CHOICES)
    file = models.FileField(upload_to='resources/', blank=True, null=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)