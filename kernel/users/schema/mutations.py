from typing import Any, Dict

from django.core.exceptions import ValidationError
from graphql.error import GraphQLError

import graphene
from graphene import relay, ObjectType
from graphene_django.types import DjangoObjectType
from users.models import Profile

from users.services import (register_new_profile as reg,
                            gen_seed as seed,
                            gen_jwt as gjwt)



class ProfileNode(DjangoObjectType):
    class Meta:
        model = Profile
        interfaces = (relay.Node,)

    user_id = graphene.Int()
    email = graphene.String()


class RegisterUserMutation(graphene.Mutation):

    profile = graphene.Field(ProfileNode)
    token = graphene.String()

    class Input:
        email = graphene.String(required=True)
        seed = graphene.String(required=True)

    @staticmethod
    def mutate(
        root: Any,
        info: graphene.ResolveInfo,
        **input: Dict[str, Any]
    ):

        try:
            profile = reg(email=input['email'],
                          seed=input['seed'])
        except ValidationError as errors:
            error_list = [str(error) for error in errors]
            raise GraphQLError(message='\n'.join(error_list))

        token = gjwt(profile=profile)

        return RegisterUserMutation(profile=profile, token=token)



class Mutations(ObjectType):
    register_user = RegisterUserMutation.Field()
