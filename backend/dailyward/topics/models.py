from django.db import models
from users.models import User

# Create your models here.

class Topic(models.Model):
    title = models.CharField(max_length=75)
    description = models.TextField
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_topics")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Participant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, choices=[("member","Member"), ("admin","Admin")])
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "topic")
    