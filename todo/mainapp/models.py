from django.db import models
from uuid import uuid4


class User(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    user_name = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()
    email = models.CharField(max_length=256, unique=True)
    is_superuser = models.BooleanField(verbose_name='права администратора', db_index=True, default=False)
    is_staff = models.BooleanField(verbose_name='права просмотра сайта администратора', db_index=True, default=False)




