from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Participant, Topic
from .utils import generate_topic_code
from .serializers import ParticipantSerializer, TopicSerializer
from .permissions import IsAdminOrParticipant

# Create your views here.


class TopicViewSet(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrParticipant]

    def get_queryset(self):
        user = self.request.user
        # Show topics where user is a participant
        return Topic.objects.filter(participant__user=user).order_by('-created_at')

    def get_serializer_context(self):
        """Pass request to serializer context for permission checks."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        code = generate_topic_code()
        topic = serializer.save(created_by=self.request.user, code=code)
        # Add creator as admin participant
        Participant.objects.create(user=self.request.user, topic=topic, role="admin")

class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsAdminOrParticipant]
    serializer_class = ParticipantSerializer

    def get_queryset(self):
        topic_id = self.kwargs.get('topic_pk')    
        return Participant.objects.filter(topic=topic_id).order_by('user__first_name', 'user__last_name')

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def join_topic_by_code(request):
    code = request.data.get('code')
    try:
        topic = Topic.objects.get(code=code)
    except Topic.DoesNotExist:
        return Response({'detail': 'Topic not found.'}, status=status.HTTP_404_NOT_FOUND)
    user = request.user

    participant, created = Participant.objects.get_or_create(user=user, topic=topic, role="member")
    
    if created:
        return Response({'detail': 'Joined topic successfully.'})
    else:
        return Response({'detail': 'You are already a participant in this topic.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def leave_topic(request, topic_pk):
    try:
        participant = Participant.objects.get(user=request.user, topic=topic_pk)
    except Participant.DoesNotExist:
        return Response({'detail': 'You are not a participant of this topic.'}, status=status.HTTP_404_NOT_FOUND)
    participant.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)