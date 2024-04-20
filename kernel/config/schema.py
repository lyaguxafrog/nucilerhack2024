# -*- coding: utf-8 -*-

import graphene
from graphene import ObjectType, Schema
import graphql_jwt


from users.schema import Mutation as UserMutation


class Query(ObjectType):
    hello = graphene.String()

    def resolve_hello(root, info, **kwargs):
        return 'world!'


class Mutation(
    UserMutation,
    ObjectType,
):
    verify_token = graphql_jwt.Verify.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()


schema = Schema(mutation=Mutation, query=Query)
