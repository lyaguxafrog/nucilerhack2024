# -*- coding: utf-8 -*-

from django.core.exceptions import ObjectDoesNotExist
from django.db.transaction import atomic

from cloud.models import PrivateKeys
from users.models import Profile


@atomic
def get_keys(user: Profile,
            service: str,
            public_key: str,
            private_key: str
    ) -> PrivateKeys:
    """
    Сервис для сохранения ключа

    :param user: Profile пользователя, котрому принадлежат ключи
    :param service: URL сервиса
    :param public_key: Публичный ключ пользователя
    :param private_key: Приватный ключ пользователя

    :returns: Новый объект приватных ключей
    """


    keys = PrivateKeys.objects.create(user, service, public_key, private_key)

    return keys


def sync_private_key(user: Profile,
                     service: str
    ) -> str:
    """
    Сервис сихнронизации приватных ключей

    :param user: Пользователь
    :param service: Сервис, ключи для логина которого

    :returns: Зашифрованный приватный ключ
    """

    try:
        private_keys = PrivateKeys.objects.get(user=user, service=service)
        return private_keys.private_key

    except ObjectDoesNotExist:
        raise Exception("Приватный ключ не найден")
