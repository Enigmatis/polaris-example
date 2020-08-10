import {PokemonContext} from "../../../utils/pokemon-context";
import {Trainer} from "../../../dal/entities/trainer";
import {UserInputError} from 'apollo-server-express';
import {getPolarisConnectionManager} from "@enigmatis/polaris-core";

export const trainerById = async (parent: any, args: { id: string }, context: PokemonContext): Promise<Trainer | undefined> => {
    let trainer: Trainer | undefined = await getPolarisConnectionManager().get().getRepository(Trainer).findOne(context, args.id);
    if (trainer) {
        return trainer;
    } else {
        throw new UserInputError("could not find a trainer with the supplied id");
    }
};
