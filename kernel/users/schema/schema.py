# -*- coding: utf-8 -*-

from graphene import ObjectType
from graphene_django.types import DjangoObjectType

from .mutations import Mutations as KeyLoginMutation

class Mutation(
    KeyLoginMutation,
    ObjectType,
):
    pass

class Query(
    ObjectType,
):
    pass
