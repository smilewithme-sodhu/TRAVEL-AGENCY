import { Router } from 'express';
import { getNetworkTree, getNetworkOverview } from '../controllers/network.controller';

export const networkRouter = Router();

networkRouter.get('/tree', getNetworkTree);
networkRouter.get('/overview', getNetworkOverview);
