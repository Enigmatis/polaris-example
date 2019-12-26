import {
    createPolarisConnection,
    ConnectionOptions,
    CommonModel,
    DataVersion
} from "@enigmatis/polaris-typeorm";
import {polarisGraphQLLogger} from "./logger";

let connectionOptions: ConnectionOptions = {
    type: "postgres",
    url: process.env.CONNECTION_STRING || '',
    entities: [
        __dirname + '/dal/*.ts',
        CommonModel,
        DataVersion
    ],
    synchronize: false,
    logging: true
};

export async function initConnection() {
    await createPolarisConnection(connectionOptions, polarisGraphQLLogger.getPolarisLogger() as any);
}

