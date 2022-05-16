from rest_framework.viewsets import GenericViewSet
from .models import User
from .serializers import UserModelSerializer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin


class UserCustomViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
