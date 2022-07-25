from rest_framework.serializers import HyperlinkedModelSerializer, PrimaryKeyRelatedField, ModelSerializer

from mainapp.serializers import UserModelSerializer
from .models import Project, TODO


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializerBase(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(HyperlinkedModelSerializer):
    project = PrimaryKeyRelatedField(read_only=True)
    creator = UserModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'


class TODOModelSerializerBase(ModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
