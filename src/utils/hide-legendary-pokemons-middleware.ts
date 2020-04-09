import {Pokemon} from "../dal/entities/pokemon";

export const pokemonMiddleware = async (resolve: any, root: any, args: any, context: any, info: any) => {
    const result = await resolve(root, args, context, info);
    if (result instanceof Array) {
        if (result.length > 0) {
            if (result[0] instanceof Pokemon) {
                result.filter((pokemon: Pokemon) =>
                    pokemon.percentageOfCatching > 10
                )
            }
        }
    }
    return result;
};
