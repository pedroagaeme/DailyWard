from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Resource
from .serializers import ResourceSerializer

# Create your views here.

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
