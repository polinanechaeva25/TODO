from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField, PrimaryKeyRelatedField

from mainapp.serializers import UserModelSerializer
from .models import Project, TODO


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(HyperlinkedModelSerializer):
    project = PrimaryKeyRelatedField(read_only=True)
    creator = UserModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'
