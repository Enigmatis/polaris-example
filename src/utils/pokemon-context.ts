import {ExpressContext, PolarisGraphQLContext} from "@enigmatis/polaris-core";
import {PokemonRequestHeaders} from "./pokemon-request-headers";

export interface PokemonContext extends PolarisGraphQLContext {
    pokemonHeLikesBetter?: string
    requestHeaders: PokemonRequestHeaders;
}

export const getPokemonContext: ((context: ExpressContext) => Partial<PokemonContext>) = (context: ExpressContext) => {
    const {req} = context;
    return {
        pokemonHeLikesBetter: undefined,
        requestHeaders: {
            isLegendary: req.headers.legendary === 'true'
        }
    };
};
