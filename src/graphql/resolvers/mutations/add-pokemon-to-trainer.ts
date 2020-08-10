import {
    getPolarisConnectionManager, PolarisError,
    PolarisGraphQLContext,
    PolarisRepository
} from "@enigmatis/polaris-core";
import {Trainer} from "../../../dal/entities/trainer";
import {Pokemon} from "../../../dal/entities/pokemon";

export const addPokemonToTrainer = async (parent: any, args: { trainerId: string, pokemonId: string }, context: PolarisGraphQLContext): Promise<Trainer[] | Trainer > => {
    const connection = await getPolarisConnectionManager().get();
    const trainerRepo: PolarisRepository<Trainer> = connection.getRepository(Trainer);
    const pokemonRepo: PolarisRepository<Pokemon> = connection.getRepository(Pokemon);
    let trainer: Trainer | undefined = await trainerRepo.findOne(context, {
        where: {id: args.trainerId},
        relations: ["pokemons"]
    });
    let pokemon: Pokemon | undefined = await pokemonRepo.findOne(context, {where: {id: args.pokemonId}});
    if (trainer && pokemon) {
        trainer.pokemons.push(pokemon);
        return trainerRepo.save(context, trainer);
    } else {
        throw new PolarisError("Could not find trainer/pokemon with the requested ids!", 400);
    }
};
