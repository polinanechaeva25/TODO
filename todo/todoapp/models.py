from django.db import models
from mainapp.models import User


class Project(models.Model):
    users = models.ManyToManyField(User)

    project_name = models.CharField(verbose_name='название', max_length=64)
    project_repo = models.URLField(verbose_name='репозиторий', max_length=512)


class TODO(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, models.PROTECT, verbose_name='создатель')

    text = models.CharField(verbose_name='заметка', max_length=256)
    is_active = models.BooleanField(verbose_name='статус', db_index=True, default=True)
    created = models.DateTimeField(verbose_name='создан', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='обновлен', auto_now=True)
