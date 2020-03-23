import * as loggerConfig from '../../resources/logger-configuration.json';
import * as polarisProperties from '../../resources/polaris-properties.json';
import {PolarisGraphQLLogger} from '@enigmatis/polaris-core';

export const polarisGraphQLLogger = new PolarisGraphQLLogger(loggerConfig, polarisProperties);
