import {ConnectionOptions, createPolarisConnection} from '@enigmatis/polaris-core';
import {polarisGraphQLLogger} from '../utils/logger';

let connectionOptions: ConnectionOptions = {
    type: 'postgres',
    url: process.env.CONNECTION_STRING || '',
    entities: [__dirname + '/entities/*.{ts,js}'],
    synchronize: true,
    logging: true,
};

export const initConnection = async (): Promise<void> => {
    await createPolarisConnection(connectionOptions, polarisGraphQLLogger);
};
