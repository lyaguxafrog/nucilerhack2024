# -*- coding: utf-8 -*-

from django.db import models

class PrivateKeys(models.Model):

    user = models.ForeignKey(
        'users.Profile',
        on_delete=models.CASCADE
    )

    service = models.URLField(
        verbose_name='link to service'
    )

    public_key = models.CharField(
        verbose_name='Публичный ключ'
    )

    private_key = models.CharField(
        verbose_name='Зашифрованный приватный ключ',
        null=True, blank=True
    )
