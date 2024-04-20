from typing import Any, Dict

from django.core.exceptions import ValidationError
from graphql.error import GraphQLError

import graphene
from graphene import relay, ObjectType
from graphene_django.types import DjangoObjectType
from users.models import KeyLogin

from users.services import create_keylogin


class KeyLogin(DjangoObjectType):
    class Meta:
        model = KeyLogin
    key = graphene.String()
    login = graphene.String()


class KeyLoginMutation(graphene.Mutation):

    class Input(graphene.InputObjectType):
        key = graphene.String(required=True)
        login = graphene.String(required=True)
    """
    Мутация для добавления ключа для сервиса.

    Пример запроса:

    mutation {
      sendKeyLogin(key: "Публичный ключ", login: "URL сервиса") {
          answer
      }
    }

    """

    class Arguments:
        keylogin_data = Input(required=True)

    keylogin = graphene.Field(KeyLogin)

    def mutate(root, info, keylogin_data=None):
        keylogin = create_keylogin(
            login=keylogin_data.login,
            key=keylogin_data.key
        )
        ok = True
        return KeyLoginMutation(keylogin=keylogin)


class Mutations(ObjectType):
    keylogin = KeyLoginMutation.Field()
