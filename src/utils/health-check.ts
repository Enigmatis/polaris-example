import * as express from 'express';
import {getPolarisConnectionManager} from '@enigmatis/polaris-core';

export const healthCheck = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        getPolarisConnectionManager().get();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(503);
    }
};
