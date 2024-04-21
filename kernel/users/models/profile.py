# -*- coding: utf-8 -8-

from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

from users.managers import CustomUserManager as ProfileManager

class Profile(models.Model):

    user = models.OneToOneField(
        'auth.User', on_delete=models.CASCADE,
        verbose_name='Ссылка на модель user в django'
    )


class EditUser(AbstractUser):
    objects = ProfileManager

    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name="edituser_set",
        related_query_name="edituser",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="edituser_set",
        related_query_name="edituser",
    )
