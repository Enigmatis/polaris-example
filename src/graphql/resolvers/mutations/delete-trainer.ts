import {PolarisGraphQLContext, getPolarisConnectionManager,} from "@enigmatis/polaris-core";
import {Trainer} from "../../../dal/entities/trainer";

export const deleteTrainer = async (parent: any, args: { trainerId: string }, context: PolarisGraphQLContext): Promise<boolean> => {
    await getPolarisConnectionManager().get().getRepository(Trainer).delete(context, args.trainerId);
    return true;
};
