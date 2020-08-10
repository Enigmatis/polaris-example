import {
    PolarisGraphQLContext,
    getPolarisConnectionManager
} from "@enigmatis/polaris-core";
import {Pokemon} from "../../../dal/entities/pokemon";

export const attackPokemon = async (parent: any, args: { id: string, hpToSubtract: number }, context: PolarisGraphQLContext): Promise<boolean> => {
    const pokemonRepo = getPolarisConnectionManager().get().getRepository(Pokemon);
    let pokemon: Pokemon | undefined = await pokemonRepo.findOne(context, {where: {id: args.id}});
    if (pokemon) {
        pokemon.hp -= args.hpToSubtract;
        await pokemonRepo.update(context, args.id, {hp: pokemon.hp});
        return true;
    }
    return false;
};
