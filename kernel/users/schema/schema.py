# -*- coding: utf-8 -*-

from graphene import ObjectType
from graphene_django.types import DjangoObjectType

from .mutations import Mutations as UserMutations
from .queries import Query as SeedQuery

class Mutation(
    UserMutations,
    ObjectType,
):
    pass

class Query(
    SeedQuery,
    ObjectType,
):
    pass
