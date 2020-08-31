import {getPolarisConnectionManager} from "@enigmatis/polaris-core";
import {Pokemon} from "./entities/pokemon";
import {Trainer} from "./entities/trainer";
import {Gender} from "../graphql/resolvers/enums/gender";

function getPokemons(): Pokemon[] {
    return [
        new Pokemon('pikachu', 2000, 30),
        new Pokemon('jigglypuff', 1000, 10),
        new Pokemon('dragonite', 4000, 15)];
}

function getTrainers(pokemons: Pokemon[]): Trainer[] {
    return [
        new Trainer("Ash", "Ketchum", 15, Gender.MALE, 10, [pokemons[0]]),
        new Trainer("Misty", "Williams", 15, Gender.FEMALE, 5, [pokemons[1]]),
        new Trainer("Brock", "Harrison", 15, Gender.MALE, 0, [pokemons[2]])
    ]
}

async function createExampleData(trainers: Trainer[], pokemons: Pokemon[]) {
    const connection = getPolarisConnectionManager().get("default");
    let trainerRepo = connection.getRepository(Trainer);
    let pokemonRepo = connection.getRepository(Pokemon);
    await pokemonRepo.save({requestHeaders: {realityId: 0}} as any, [pokemons[0], pokemons[1]]);
    await pokemonRepo.save({requestHeaders: {realityId: 3}} as any, pokemons[2]);
    await trainerRepo.save({requestHeaders: {realityId: 0}} as any, trainers);
}

export async function initializeDatabase() {
    const pokemons: Pokemon[] = getPokemons();
    const trainers: Trainer[] = getTrainers(pokemons);
    await createExampleData(trainers, pokemons);
}
