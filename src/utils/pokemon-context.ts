import {ExpressContext, PolarisGraphQLContext, PolarisConnection} from "@enigmatis/polaris-core";
import {PokemonRequestHeaders} from "./pokemon-request-headers";

export interface PokemonContext extends PolarisGraphQLContext {
    pokemonHeLikesBetter?: string
    pokemonConnection?: PolarisConnection,
    requestHeaders: PokemonRequestHeaders;
}

export const getPokemonContext: ((context: ExpressContext) => Partial<PokemonContext>) = (context: ExpressContext) => {
    const {req, connection } = context;
    const headers = req ? req.headers : connection?.context;
    return {
        pokemonHeLikesBetter: undefined,
        requestHeaders: {
            isLegendary: headers.legendary === 'true'
        }
    };
};