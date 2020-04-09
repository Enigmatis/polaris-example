import {pubsub} from "./pubsub";
import {TRAINER_ADDED} from "./event-names";

export const trainerAdded = {
    subscribe: () => pubsub.asyncIterator([TRAINER_ADDED])
};
