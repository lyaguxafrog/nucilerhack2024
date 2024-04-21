# -*- coding: utf-8 -*-

import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphene_django.converter import convert_django_field
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import gettext as _
from graphql_jwt.decorators import login_required


from cloud.models import PrivateKeys as PK
from cloud.services import get_keys as getk, sync_private_key as sharek
from users.models import Profile


class PrivateKeyNode(DjangoObjectType):
    class Meta:
        model = PK
        interfaces = (relay.Node,)

        only_fields = '__all__'

    user_email = graphene.String

    def resolve_user_email(self, info):
        profile = self.user
        return profile.user.email


class SaveKeysMutation(graphene.Mutation):
    class Arguments:
        service = graphene.String(required=True)
        public_key = graphene.String(required=True)
        private_key = graphene.String(required=True)

    success = graphene.Boolean()
    key = graphene.Field(PrivateKeyNode)

    @login_required
    def mutate(self, info, service, public_key, private_key):
        user = info.context.user
        profile = Profile.objects.get(user=user)
        print(user)
        print(profile)
        key = getk(profile, service, public_key, private_key)
        return SaveKeysMutation(success=True, key=key)



class SyncPrivateKeyMutation(graphene.Mutation):
    class Arguments:
        service = graphene.String(required=True)

    success = graphene.Boolean()
    private_key = graphene.String()

    @login_required
    def mutate(self, info, service):
        user = info.context.user
        print(user)
        try:
            private_key = sharek(user, service)
            return SyncPrivateKeyMutation(success=True, private_key=private_key)
        except ObjectDoesNotExist:
            return SyncPrivateKeyMutation(success=False, private_key=None)



class Mutation(
    graphene.ObjectType
):
    save_keys = SaveKeysMutation.Field()
    sync_private_key = SyncPrivateKeyMutation.Field()
