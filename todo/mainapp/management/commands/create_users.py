from django.core.management.base import BaseCommand
from mainapp.models import User
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Creates superuser and specified number of users for a test'

    def add_arguments(self, parser):
        parser.add_argument('count_of_users', nargs=1, type=int)

    def handle(self, *args, **options):
        #Создание суперпользователя
        Superuser = get_user_model()
        if not Superuser.objects.filter(username='admin'):
            Superuser.objects.create_superuser('admin', 'admin@admin.com', 'adminadmin')

        count_of_users = options['count_of_users'][0]

        #Если нужно/можно очистить весь список пользователей
        # users = User.objects.all()
        # users.delete()

        #Удаление только тестовых пользователей в том количестве, в котором планируется создать новых
        for i in range(count_of_users):
            user = User.objects.filter(user_name=f'User{i}')
            user.delete()

        #Создание тестовых пользователей
        for i in range(count_of_users):
            User.objects.create(user_name=f'User{i}', first_name=f'user{i}',
                                last_name=f'user-user-{i}', birthday_year=f'{i}',
                                email=f'user{i}@user{i}.com')

        self.stdout.write(f'Successfully created {count_of_users} users!')
