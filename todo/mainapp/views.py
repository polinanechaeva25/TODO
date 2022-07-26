from rest_framework.viewsets import GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerWithStatus
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin


class UserCustomViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerWithStatus
        return UserModelSerializer
