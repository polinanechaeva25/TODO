from django_filters import rest_framework as filters
from .models import Project, TODO


class ProjectFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['project_name']



#
class TODOFilter(filters.FilterSet):

    class Meta:
        model = TODO
        fields = {
            'project': ['exact'],
            'created': ['year__lte', 'year__gte'],
        }
