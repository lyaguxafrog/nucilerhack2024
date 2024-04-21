# -*- coding: utf-8 -*-

from mnemonic import Mnemonic as mn
import jwt

from graphql_jwt.utils import jwt_payload

from django.db.transaction import atomic
from django.contrib.auth.models import User
from django.conf import settings

from config.settings import SEED_LANGUAGE
from users.models import Profile


mnemo = mn(SEED_LANGUAGE)

def gen_seed() -> str:
    """
    Функция генерации сида

    :return: Строку в виде 12 случайных английских слов
    """

    seed_generation = mnemo.generate(128)

    return seed_generation

@atomic
def register_new_profile(email: str, seed: str) -> Profile:

    user = User.objects.create(email=email, username=email)
    user.set_password(seed)
    user.save()

    return Profile.objects.create(user=user)


def gen_jwt(profile: Profile) -> str:
    """
    Сервис генерации JWT токенов

    :param profile: Объект профиля

    :returns: Возвращает сгенерированный токен
    """

    payload = jwt_payload(profile.user)
    token = jwt.encode(payload, settings.SECRET_KEY)

    return token
