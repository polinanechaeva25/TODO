import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from django.contrib.auth.models import User as User_auth
from .views import UserCustomViewSet
from .models import User


class TestUserCustomViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'user_name': 'User_Polina', 'first_name': 'Polina',
                                               'last_name': 'Nechaeva', 'birthday_year': 2000,
                                               'email': 'polina@mail.ru'}, format='json')
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'user_name': 'User_Polina', 'first_name': 'Polina',
                                               'last_name': 'Nechaeva', 'birthday_year': 2000,
                                               'email': 'polina@mail.ru'}, format='json')
        admin = User_auth.objects.create_superuser('admin', 'admin@admin.com', 'admin1234')
        force_authenticate(request, admin)
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = User.objects.create(user_name='User_Polya', first_name='Polya',
                                   last_name='Nech', birthday_year=2000,
                                   email='polina2000@mail.ru')
        client = APIClient()
        response = client.get(f'/api/users/{user.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = User.objects.create(user_name='User_Polya', first_name='Polya',
                                   last_name='Nech', birthday_year=2000,
                                   email='polina2000@mail.ru')
        client = APIClient()
        response = client.put(f'/api/users/{user.uid}/', {'first_name': 'Грин', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        user = User.objects.create(user_name='User_Polya', first_name='Polya',
                                   last_name='Nech', birthday_year=2000,
                                   email='polina2000@mail.ru')
        client = APIClient()
        admin = User_auth.objects.create_superuser('admin', 'admin@admin.com', 'admin1234')
        client.login(username='admin', password='admin1234')
        response = client.put(f'/api/users/{user.uid}/', {'user_name': 'User_Polina', 'first_name': 'Грин',
                                                          'last_name': 'Nechaeva', 'birthday_year': 1880,
                                                          'email': 'polina@mail.ru'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(uid=user.uid)
        self.assertEqual(user.first_name, 'Грин')
        self.assertEqual(user.birthday_year, 1880)
        client.logout()
