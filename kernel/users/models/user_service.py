# -*- coding: utf-8 -*-

from django.db import models


class KeyLogin(models.Model):

    login = models.CharField(
        verbose_name="URL сервиса, в который мы логинимся"
    )

    key = models.CharField(
        verbose_name="Открытый ключ сервиса",
        unique=True
    )
