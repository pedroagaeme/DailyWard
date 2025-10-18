from django.shortcuts import render
from .permissions import IsAuthor, IsAuthorOrTopicAdmin, IsTopicParticipant
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse, Http404
from django.core.files.storage import default_storage
from .models import Resource, ResourceFile
from .serializers import ResourceSerializer
from topics.models import Topic

# Create your views here.

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    def get_permissions(self):
        # map actions to small permissions
        if self.action in ("list", "retrieve", "create"):
            return [permissions.IsAuthenticated(), IsTopicParticipant()]
        if self.action in ("update", "partial_update"):
            return [permissions.IsAuthenticated(), IsAuthor()]
        if self.action == "destroy":
            return [permissions.IsAuthenticated(), IsAuthorOrTopicAdmin()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        topic_id = self.kwargs.get('topic_pk')          
        return Resource.objects.filter(topic=topic_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        topic_id = self.kwargs.get('topic_pk')
        topic = Topic.objects.get(pk=topic_id)
        resource = serializer.save(uploaded_by=self.request.user, topic=topic)
        
        # Handle multiple files if provided
        files_data = self.request.FILES.getlist('files')
        for file_data in files_data:
            ResourceFile.objects.create(
                resource=resource,
                file_url=file_data,
                filename=file_data.name,
                file_size=file_data.size,
                mime_type=file_data.content_type
            )

class ResourceFileDownloadView(APIView):
    """
    API view to get download URL for ResourceFile objects.
    Returns the file URL for frontend to download directly.
    """
    permission_classes = [permissions.IsAuthenticated, IsTopicParticipant]

    def get(self, request, topic_pk, resource_pk, file_pk):
        try:
            # Get the resource file
            resource_file = ResourceFile.objects.select_related('resource').get(
                id=file_pk,
                resource_id=resource_pk,
                resource__topic_id=topic_pk
            )
            
            # Check if file exists
            if not resource_file.file_url:
                raise Http404("File not found")
            
            # Get the proper Azure Blob Storage URL
            file_url = default_storage.url(resource_file.file_url.name)
            
            return Response({
                'url': file_url,
                'filename': resource_file.filename,
                'mime_type': resource_file.mime_type
            })
            
        except ResourceFile.DoesNotExist:
            raise Http404("Resource file not found")
        except Exception as e:
            return Response(
                {'error': f'Failed to get file URL: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
