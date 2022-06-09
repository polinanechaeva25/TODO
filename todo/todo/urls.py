from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from mainapp.views import UserCustomViewSet
from todoapp.views import TODOLimitOffsetPaginationViewSet, ProjectLimitOffsetPaginationViewSet
from rest_framework.authtoken import views

router = DefaultRouter()
router.register('users', UserCustomViewSet)
# router.register('project', ProjectModelViewSet)
router.register('project', ProjectLimitOffsetPaginationViewSet)
router.register('todo', TODOLimitOffsetPaginationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
]