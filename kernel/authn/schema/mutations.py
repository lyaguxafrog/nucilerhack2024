# -*- coding: utf-8 -*-


import graphene
from graphene import relay, ObjectType

from graphql_jwt.decorators import login_required
from graphene_django.types import DjangoObjectType

from authn.models import Signature
from authn.services import new_sign_object as new_sign, verify_signature as vs

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


class VerifuSignatureMutations(graphene.Mutation):
    verify = graphene.Boolean()

    class Input:
        signature = graphene.String(required=True)

    @login_required
    def mutate(self, info, **input): # Добавлен метод mutate
        user = info.context.user
        profile = user.profile

        if vs(signature=input['signature'],
              user=profile):
            return VerifuSignatureMutations(verify=True)
        else:
            return VerifuSignatureMutations(verify=False)


class Mutation(ObjectType):
    new_sign = NewSignMutation.Field()
    validate_signature = VerifuSignatureMutations.Field()
