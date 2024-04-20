# -*- coding: utf-8 -*-

from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.validators import ASCIIUsernameValidator


validate_password = ASCIIUsernameValidator()

class CustomUserManager(BaseUserManager):
    """
    Менеджер профиля, позволяющий создать пользователя в котором в качестве
    пароля может быть gen_seed из `users.services`
    """

    def create_user(self, email: str, password=None, **extra_fields):
        """
        Метод менеджера профиля для создания профиля с SEED вместо пароля

        :param email: Email пользователя, проходит валидацию
        :param
        """

        if not email:
            raise ValueError("The email must be set.")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        if password:
            user.set_password(password)

        else:
            raise ValueError('No pass-seed.')

        return user


    def create_superuser(self, email, password, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if password:
            validate_password(password)

        superuser = self.create_user(email, password, **extra_fields)

        return superuser
