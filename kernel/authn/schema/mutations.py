# -*- coding: utf-8 -*-


import graphene
from graphene import relay, ObjectType

from graphql_jwt.decorators import login_required
from graphene_django.types import DjangoObjectType

from authn.models import Signature
from authn.services import new_sign_object as new_sign

class SignNode(DjangoObjectType):
    class Meta:
        model = Signature
        interfaces = (relay.Node,)


class NewSignMutation(graphene.Mutation):

    signature = graphene.Field(SignNode)


    @login_required
    def mutate(self, info):

        user = info.context.user
        profile = user.profile


        new_signature = new_sign(user=profile)

        return NewSignMutation(signature=new_signature)


class Mutation(ObjectType):
    new_sign = NewSignMutation.Field()
