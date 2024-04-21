# -*- coding: utf-8 -*-

import graphene
from graphene import ObjectType, Schema
import graphql_jwt

from users.schema import Mutation as UserMutation, Query as UserQuery
from cloud.schema import Mutations as CloudMutation
from authn.schema import Mutations as SignMutation

class Query(UserQuery,
            ObjectType
): pass


class Mutation(
    UserMutation,
    CloudMutation,
    SignMutation,
    ObjectType,
):
    verify_token = graphql_jwt.Verify.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()


schema = Schema(mutation=Mutation, query=Query)
