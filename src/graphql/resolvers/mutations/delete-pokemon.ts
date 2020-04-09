import {PolarisGraphQLContext, getPolarisConnectionManager,} from "@enigmatis/polaris-core";
import {Pokemon} from "../../../dal/entities/pokemon";

export const deletePokemon = async (parent: any, args: { pokemonId: string }, context: PolarisGraphQLContext): Promise<boolean> => {
    await getPolarisConnectionManager().get().getRepository(Pokemon).delete(context, args.pokemonId);
    return true;
};
