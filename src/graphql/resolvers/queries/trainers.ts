import {getPolarisConnectionManager, PolarisGraphQLContext} from "@enigmatis/polaris-core";
import {Trainer} from "../../../dal/entities/trainer";
import {polarisGraphQLLogger} from "../../../utils/logger";

export const trainers = (parent: any, args: any, context: PolarisGraphQLContext): Promise<Trainer[]> => {
    polarisGraphQLLogger.debug("I'm the resolver of all trainers", context);
    return getPolarisConnectionManager().get().getRepository(Trainer).find(context, {relations: ["pokemons"]});
};
