from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from mainapp.views import UserCustomViewSet
from todoapp.views import TODOLimitOffsetPaginationViewSet, ProjectLimitOffsetPaginationViewSet
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView

router = DefaultRouter()

router.register('users', UserCustomViewSet) #to comment for method with using NamespaceVersioning
# router.register('project', ProjectModelViewSet)
router.register('project', ProjectLimitOffsetPaginationViewSet)
router.register('todo', TODOLimitOffsetPaginationViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Notices",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),

# UrlPathVersioning
    # re_path(r'^api/(?P<version>\d\.\d)/users/$', UserCustomViewSet.as_view({'get': 'list'})),

# NamespaceVersioning
#     path('api/users/0.1', include('mainapp.urls', namespace='0.1')),
#     path('api/users/0.2', include('mainapp.urls', namespace='0.2')),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
]

