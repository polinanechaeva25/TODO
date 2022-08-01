from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('uid', 'user_name', 'first_name', 'last_name')


class UserModelSerializerWithStatus(ModelSerializer):
    class Meta:
        model = User
        fields = ('uid', 'user_name', 'first_name', 'last_name', 'is_superuser', 'is_staff')
