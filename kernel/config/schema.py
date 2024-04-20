# -*- coding: utf-8 -*-

import graphene
from graphene import ObjectType, Schema

from users.schema import Mutation as UserMutation


class Query(ObjectType):
    hello = graphene.String()

    def resolve_hello(root, info, **kwargs):
        return 'world!'


class Mutation(
    UserMutation,
    ObjectType,
): pass



schema = Schema(mutation=Mutation, query=Query)
