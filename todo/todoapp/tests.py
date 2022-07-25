import json
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User as User_auth
from mainapp.models import User
from .models import Project, TODO


class TestProjectLimitOffsetPaginationViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        user1 = User.objects.create(user_name='User_Polya', first_name='Polya',
                                    last_name='Nech', birthday_year=2000,
                                    email='polina2000@mail.ru')
        project = Project.objects.create(project_name='robobox',
                                         project_repo='https://github.com/polinanechaeva25/Django_base/robots')
        project.users.add(user1)
        project.save()
        admin = User_auth.objects.create_superuser('admin', 'admin@admin.com', 'admin1234')
        self.client.login(username='admin', password='admin1234')
        response = self.client.put(f'/api/project/{project.id}/',
                                   {'users': user1.uid, 'project_name': 'Руслан и Людмила',
                                    'project_repo': 'https://github.com/polinanechaeva25/Django_base/robobox'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.project_name, 'Руслан и Людмила')


class TestTODOLimitOffsetPaginationViewSet(APITestCase):
    def test_edit_mixer(self):
        notice = mixer.blend(TODO)
        admin = User_auth.objects.create_superuser('admin', 'admin@admin.com', 'admin1234')
        self.client.login(username='admin', password='admin1234')
        response = self.client.put(f'/api/todo/{notice.id}/',
                                   {'project': notice.project.id, 'creator': notice.creator.uid,
                                    'text': 'Руслан и Людмила'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        notice = TODO.objects.get(id=notice.id)
        self.assertEqual(notice.text, 'Руслан и Людмила')
