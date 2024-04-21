# -*- coding: utf-8 -*-

import graphene

from users.services import gen_seed as gs

class GenSeedQuery(graphene.ObjectType):
    gen_seed = graphene.String()

    def resolve_gen_seed(self, info) -> str:
        seed = gs()

        return seed


class Query(GenSeedQuery,
            graphene.ObjectType
): pass
