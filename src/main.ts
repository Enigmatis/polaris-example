import {PolarisServer, getConnectionManager} from '@enigmatis/polaris-core';
import {typeDefs} from './schema/type-defs';
import {resolvers} from './schema/resolvers';
import * as polarisProperties from '../polaris-properties.json';
import {initConnection} from "./connection-manager\'";
import {initializeDatabase} from "./data-initalizer";
import {loggerConfig} from "./logger";

let server: PolarisServer;

let startApp = async () => {
    await initConnection();
    await initializeDatabase();
    server = new PolarisServer({
        typeDefs,
        resolvers,
        port: polarisProperties.port,
        loggerConfiguration: loggerConfig,
        connection: getConnectionManager().get(),
    });
    await server.start();
};

try {
    startApp();
} catch (e) {
    if (server) server.stop();
    console.log(e);
    process.exit(0)
}
