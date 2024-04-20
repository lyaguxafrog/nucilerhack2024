
from django.core.exceptions import ValidationError
from django.db.transaction import atomic
from users.models import KeyLogin

@atomic
def create_keylogin(login: str, key: str) -> KeyLogin:
    """
    Сервис по записи URL сервиса и открытого ключа

    :param login: URL сервиса
    :param key: открытый ключ

    :returns: Возвращает объект users.KeyLogin
    """
    try:
        # Basic validation
        if not login.startswith('http'):
            raise ValidationError("Login must be a valid URL starting with 'http'.")

        keylogin = KeyLogin.objects.create(
            login=login,
            key=key,
        )
        return keylogin
    except Exception as e:
        # Log the error and re-raise
        print(f"Error creating KeyLogin: {e}")
        raise
