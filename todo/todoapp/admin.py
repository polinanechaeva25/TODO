from django.contrib import admin
from todoapp.models import TODO, Project

admin.site.register(TODO)
admin.site.register(Project)