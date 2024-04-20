from typing import Any, Dict

from django.core.exceptions import ValidationError
from graphql.error import GraphQLError

import graphene
from graphene import relay, ObjectType
from graphene_django.types import DjangoObjectType
from users.models import KeyLogin, Profile

from users.services import (create_keylogin,
                            register_new_profile as reg,
                            gen_seed as seed,
                            gen_jwt as gjwt)


class KeyLogin(DjangoObjectType):
    class Meta:
        model = KeyLogin
    key = graphene.String()
    login = graphene.String()


class ProfileNode(DjangoObjectType):
    class Meta:
        model = Profile
        interfaces = (relay.Node,)

    user_id = graphene.Int()
    email = graphene.String()


class RegisterUserMutation(graphene.Mutation):

    profile = graphene.Field(ProfileNode)
    token = graphene.String()

    class Input:
        email = graphene.String(required=True)
        seed = graphene.String(required=True)

    @staticmethod
    def mutate(
        root: Any,
        info: graphene.ResolveInfo,
        **input: Dict[str, Any]
    ):

        try:
            profile = reg(email=input['email'],
                          seed=input['seed'])
        except ValidationError as errors:
            error_list = [str(error) for error in errors]
            raise GraphQLError(message='\n'.join(error_list))

        token = gjwt(profile=profile)

        return RegisterUserMutation(profile=profile, token=token)

class KeyLoginMutation(graphene.Mutation):
    """
    Мутация для добавления ключа для сервиса.

    Пример запроса:

    mutation {
      sendKeyLogin(key: "Публичный ключ", login: "URL сервиса") {
          answer
      }
    }

    """
    class Input:
        key = graphene.String(required=True)
        login = graphene.String(required=True)

    # class Arguments:
    #     keylogin_data = Input(required=True)

    keylogin = graphene.Field(KeyLogin)

    def mutate(root: Any,
        info: graphene.ResolveInfo,
        **input: Dict[str, Any]):

        keylogin = create_keylogin(
            key=input['key'],
            login=input['login']
        )
        ok = True
        return KeyLoginMutation(keylogin=keylogin)


class Mutations(ObjectType):
    keylogin = KeyLoginMutation.Field()
    register_user = RegisterUserMutation.Field()
