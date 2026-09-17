import { Router } from 'express';
import { getNetworkTree } from '../controllers/network.controller';

export const networkRouter = Router();

networkRouter.get('/tree', getNetworkTree);
