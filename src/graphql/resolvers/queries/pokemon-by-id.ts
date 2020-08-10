import {Pokemon} from "../../../dal/entities/pokemon";
import {getPolarisConnectionManager, PolarisError } from "@enigmatis/polaris-core";
import {PokemonContext} from "../../../utils/pokemon-context";

export const pokemonById = async (parent: any, args: { id: string }, context: PokemonContext): Promise<Pokemon | undefined> => {
    if (context.clientIp == undefined) {
        throw new Error("no user");
    }

    let pokemon: Pokemon | undefined = await getPolarisConnectionManager().get().getRepository(Pokemon).findOne(context,args.id);
    if (pokemon) {
        if (context.pokemonHeLikesBetter) {
            throw new Error("do you like " + context.pokemonHeLikesBetter + " more than me?");
        } else {
            context.pokemonHeLikesBetter = pokemon.name;
            return pokemon;
        }
    } else {
        throw new PolarisError("no pokemon", 500);
    }
};
