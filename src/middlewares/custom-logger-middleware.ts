import {PolarisGraphQLContext} from '@enigmatis/polaris-core';
import {polarisGraphQLLogger} from "../utils/logger";
import {GraphQLFieldConfigArgumentMap, GraphQLResolveInfo} from 'graphql';


export const customLoggerMiddleware = async (resolve: any,
                                             root: any,
                                             args: GraphQLFieldConfigArgumentMap,
                                             context: PolarisGraphQLContext,
                                             info: GraphQLResolveInfo) => {
    polarisGraphQLLogger.info(`Started resolving field: ${info.fieldName}`, context);
    const start = new Date().getTime();
    try {
        const result = await resolve(root, args, context, info);
        const finish = new Date().getTime();
        polarisGraphQLLogger.info(`Finished resolving field: ${info.fieldName}`,
            context, {elapsedTime: finish - start});
        return result;
    } catch (e) {
        const finish = new Date().getTime();
        polarisGraphQLLogger.info(`Failed resolving field: ${info.fieldName}`,
            context, {throwable: e, elapsedTime: finish - start});
        return e;
    }
};
