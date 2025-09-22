from django.db import models
from topics.models import Topic
from users.models import User

# Create your models here.

class Resource(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)