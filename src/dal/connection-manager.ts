import {ConnectionOptions, createPolarisConnection} from "@enigmatis/polaris-core";
import {polarisGraphQLLogger} from "../utils/logger";

let connectionOptions: ConnectionOptions = {
    type: "postgres",
    url: process.env.CONNECTION_STRING || '',
    entities: [__dirname + '/entities/*.{ts,js}'],
    synchronize: true,
    logging: true,
    schema: "polaris-example",
    dropSchema: true
};

export async function initConnection() {
    await createPolarisConnection(connectionOptions, polarisGraphQLLogger);
}
