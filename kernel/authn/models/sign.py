# -*- coding: utf-8 -*-


from django.db import models


class Signature(models.Model):

    user = models.ForeignKey(
        'users.Profile',
        on_delete=models.DO_NOTHING
    )

    signature = models.CharField(
        verbose_name="Не подписанная строка"
    )
