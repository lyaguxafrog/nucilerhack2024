# -*- coding: utf-8 -*-

from django.db import models


class Service(models.Model):

    service_url = models.URLField(
        verbose_name="URL сервиса, в который мы логинимся"
    )

    login = models.CharField(
        verbose_name="Логин пользователя"
    )
