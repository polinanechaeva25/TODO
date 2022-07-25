from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.viewsets import ModelViewSet
from .models import Project, TODO
from .serializers import ProjectModelSerializer, TODOModelSerializer, ProjectModelSerializerBase, \
    TODOModelSerializerBase
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, TODOFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectLimitOffsetPaginationViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase


class TODOLimitOffsetPaginationViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffsetPagination
    filterset_class = TODOFilter

    # If don't use filter's classes
    # filterset_fields = ['project']

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TODOModelSerializer
        return TODOModelSerializerBase

    def get_queryset(self):
        return TODO.objects.filter(is_active=True)

    def destroy(self, request, *args, **kwargs):
        self.object = self.get_object()
        self.object.is_active = False
        self.object.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
