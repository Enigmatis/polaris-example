import {Pokemon} from "../../../dal/entities/pokemon";
import {getPolarisConnectionManager, MoreThan, PolarisGraphQLContext} from "@enigmatis/polaris-core";

export const pokemonsBiggerThanHp = (parent: any, args: { minHp: number }, context: PolarisGraphQLContext): Promise<Pokemon[] | undefined> => {
    return getPolarisConnectionManager().get().getRepository(Pokemon).find(context, {where: {hp: MoreThan(args.minHp)}});
};
