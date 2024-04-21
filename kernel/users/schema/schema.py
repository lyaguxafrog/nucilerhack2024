# -*- coding: utf-8 -*-

from graphene import ObjectType
from graphene_django.types import DjangoObjectType

from .mutations import Mutations as KeyLoginMutation
from .queries import Query as SeedQuery

class Mutation(
    KeyLoginMutation,
    ObjectType,
):
    pass

class Query(
    SeedQuery,
    ObjectType,
):
    pass
