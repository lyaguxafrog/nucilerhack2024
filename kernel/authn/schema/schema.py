# -*- coding: utf-8 -*-

from graphene import ObjectType

from .mutations import Mutation as SignMutations

class Query(
    ObjectType,
):
    pass

class Mutations(
    SignMutations,
    ObjectType
):
    pass
