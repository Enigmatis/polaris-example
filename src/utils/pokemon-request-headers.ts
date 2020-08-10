import {PolarisRequestHeaders} from "@enigmatis/polaris-core";

export interface PokemonRequestHeaders extends PolarisRequestHeaders {
    isLegendary: boolean
}
