import {pokemonById} from "./queries/pokemon-by-id";
import {attackPokemon} from "./mutations/attack-pokemon";
import {trainers} from "./queries/trainers";
import {pokemonsBiggerThanHp} from "./queries/pokemons-bigger-than-hp";
import {addTrainer} from "./mutations/add-trainer";
import {changeTrainerFirstName} from "./mutations/change-trainer-first-name";
import {addPokemonToTrainer} from "./mutations/add-pokemon-to-trainer";
import {deleteTrainer} from "./mutations/delete-trainer";
import {deletePokemon} from "./mutations/delete-pokemon";
import {Trainer} from "../../dal/entities/trainer";
import {Pokemon} from "../../dal/entities/pokemon";
import {Rarity} from "./enums/rarity";
import {trainerById} from "./queries/trainer-by-id";
import {PokemonContext} from "../../utils/pokemon-context";
import {trainerAdded} from "./subscription/trainer-added";

export const resolvers = {
    Query: {
        pokemonById,
        trainers,
        pokemonsBiggerThanHp,
        trainerById,
    },
    Mutation: {
        addTrainer,
        addPokemonToTrainer,
        changeTrainerFirstName,
        deleteTrainer,
        deletePokemon,
        attackPokemon,
    },
    Subscription: {
        trainerAdded
    },
    Trainer: {
        name: (trainer: Trainer) => `${trainer.firstName} ${trainer.lastName}`,
        age: (trainer: Trainer) => trainer.yearsOnEarth,
    },
    Pokemon: {
        name: (pokemon: Pokemon, args: any, context: PokemonContext) => {
            if (context.requestHeaders.isLegendary) {
                pokemon.name = "Legendary " + pokemon.name;
            }
            return pokemon.name;
        },
        rarity: (pokemon: Pokemon) => {
            const percentage: number = pokemon.percentageOfCatching;
            if (percentage < 10) {
                return Rarity.LEGENDARY;
            } else if (percentage < 30) {
                return Rarity.RARE;
            } else {
                return Rarity.COMMON;
            }
        }
    },
};
