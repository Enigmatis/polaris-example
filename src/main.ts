import {app, getPolarisConnectionManager, PolarisServer} from '@enigmatis/polaris-core';
import {typeDefs} from './schema/type-defs';
import {resolvers} from './schema/resolvers';
import * as polarisProperties from '../resources/polaris-properties.json';
import {initConnection} from './dal/connection-manager';
import {initializeDatabase} from './dal/data-initalizer';
import {realitiesHolder} from './utils/realities-holder';
import {healthCheck} from './utils/health-check';

let server: PolarisServer;

let startApp = async () => {
    await initConnection();
    await initializeDatabase();
    server = new PolarisServer({
        typeDefs,
        resolvers,
        port: polarisProperties.port,
        connection: getPolarisConnectionManager().get(),
        supportedRealities: realitiesHolder,
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
