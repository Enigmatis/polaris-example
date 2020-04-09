import {PolarisGraphQLContext, getPolarisConnectionManager} from "@enigmatis/polaris-core";
import {Trainer} from "../../../dal/entities/trainer";
import {Gender} from "../enums/gender";
import {pubsub} from "../subscription/pubsub";
import {TRAINER_ADDED} from "../subscription/event-names";

export const addTrainer = async (parent: any, args: { firstName: string, lastName: string, age: number, gender: Gender, amountOfTournaments: number }, context: PolarisGraphQLContext): Promise<Trainer | Trainer[]> => {
    const trainer: Trainer = new Trainer(args.firstName, args.lastName, args.age, args.gender, args.amountOfTournaments, []);
    const promise = getPolarisConnectionManager().get().getRepository(Trainer).save(context, trainer);
    pubsub.publish(TRAINER_ADDED, {trainerAdded: trainer});
    return promise;
};
