# -*- coding: utf-8 -*-

import secrets
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_public_key


from django.db.transaction import atomic

from users.models import Profile
from authn.models import Signature
from cloud.models import PrivateKeys


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


@atomic
def verify_signature(signature: str,
                     user: Profile,
    ) -> bool:
    """
    Сервис валидации подписи

    :param signature: Полученная подписанная строка
    :param user: Профиль у которого мы возьмем строку

    :return: Bool значение на валидность
    """
    message = Signature.objects.get(user=user).signature

    pr_key_object = PrivateKeys.objects.get(user=user)
    public_key_str = pr_key_object.public_key

    public_key_bytes = public_key_str.encode()

    public_key = load_pem_public_key(public_key_bytes)

    try:
        public_key.verify(
            signature,
            message,
            padding.PKCS1v15(),
            hashes.SHA256()
    )

        return True
    except:
        return False
