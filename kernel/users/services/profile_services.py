# -*- coding: utf-8 -*-

from mnemonic import Mnemonic as mn

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


def register_new_profile(email: str) -> Profile:
    pass
