from django.db import models
from users.models import User
from topics.models import Topic

class Post(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    content_text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    content_pic = models.ImageField(upload_to='post_pics/', blank=True, null=True)

# Create your models here.
