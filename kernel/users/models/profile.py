# -*- coding: utf-8 -8-

from django.db import models

from users.managers import CustomUserManager as ProfileManager

class Profile(models.Model):

    user = models.OneToOneField(
        'auth.User', on_delete=models.CASCADE,
        verbose_name='Ссылка на модель user в django'
    )

    objects = ProfileManager()
