from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Participant, Topic
from .serializers import TopicSerializer
from .permissions import IsAdminOrParticipant

# Create your views here.


class TopicViewSet(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrParticipant]

    def get_queryset(self):
        user = self.request.user
        # Show topics where user is a participant
        return Topic.objects.filter(participant__user=user)

    def perform_create(self, serializer):
        topic = serializer.save(created_by=self.request.user)
        # Add creator as admin participant
        Participant.objects.create(user=self.request.user, topic=topic, role="admin")