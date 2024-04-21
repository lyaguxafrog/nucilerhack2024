# -*- coding: utf-8 -*-

from graphene import ObjectType

from .mutations import Mutation as CloudMutations

class Query(
    ObjectType,
):
    pass

class Mutations(
    CloudMutations,
    ObjectType
): pass
