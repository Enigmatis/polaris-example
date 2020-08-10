import {PolarisGraphQLContext, getPolarisConnectionManager} from "@enigmatis/polaris-core";
import {Trainer} from "../../../dal/entities/trainer";

export const changeTrainerFirstName = async (parent: any, args: { trainerId: string, firstName: string }, context: PolarisGraphQLContext): Promise<boolean> => {
    await getPolarisConnectionManager().get().getRepository(Trainer).update(context, args.trainerId, {firstName: args.firstName});
    return true;
};
