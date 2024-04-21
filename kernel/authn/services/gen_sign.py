# -*- coding: utf-8 -*-

import secrets

from django.db.transaction import atomic

from users.models import Profile
from authn.models import Signature

def gen_random_signature(length=16) -> str:
    """
    Генерация строки заданой длины

    :param length: Длина строки

    :returns: Случайная строка
    """

    return secrets.token_hex(length)


@atomic
def new_sign_object(user: Profile) -> Signature:
    """
    Функция генерации и сохранения сигнатуры

    :param user: Объект пользователя

    :return: Не подписаная строка
    """

    new_sign = gen_random_signature()

    sign = Signature.objects.create(user=user, signature=new_sign)

    return sign
