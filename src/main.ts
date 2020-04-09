import {
    app,
    ExpressContext,
    getPolarisConnectionManager,
    PolarisServer,
} from "@enigmatis/polaris-core";
import {typeDefs} from "./graphql/schema/type-defs";
import {resolvers} from "./graphql/resolvers/resolvers";
import * as applicationProperties from "../resources/polaris-properties.json";
import {initConnection} from "./dal/connection-manager";
import {initializeDatabase} from "./dal/data-initalizer";
import {realitiesHolder} from "./utils/realities-holder";
import {healthCheck} from "./utils/health-check";
import * as depthLimit from "graphql-depth-limit";
import {getPokemonContext} from "./utils/pokemon-context";
import {customLoggerMiddleware} from "./middlewares/custom-logger-middleware";
import {polarisGraphQLLogger} from "./utils/logger";
import {pokemonMiddleware} from "./utils/hide-legendary-pokemons-middleware";

let server: PolarisServer;

let startApp = async () => {
    await initConnection();
    await initializeDatabase();
    server = new PolarisServer({
        typeDefs,
        resolvers,
        port: applicationProperties.port,
        connection: getPolarisConnectionManager().get(),
        supportedRealities: realitiesHolder,
        validationRules: [depthLimit(2)],
        applicationProperties,
        customContext: (context: ExpressContext) => getPokemonContext(context),
        customMiddlewares: [customLoggerMiddleware, pokemonMiddleware],
        logger: polarisGraphQLLogger,
        allowSubscription: true
    });
    app.get('/health', healthCheck);
    await server.start();
};

startApp().catch(async e => {
    if (server) {
        await server.stop();
    }
    console.log(e);
    process.exit(0);
});
