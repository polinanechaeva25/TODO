from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('user_name', 'first_name', 'last_name')


class UserModelSerializerWithStatus(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('user_name', 'first_name', 'last_name', 'is_superuser', 'is_staff')
