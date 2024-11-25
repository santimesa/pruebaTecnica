import { Router } from "express";

import {getRedits,createNewReditsDataBase} from '../controllers/reddit-controller';

const router = Router();

router.get('/reddit', getRedits );

router.post('/redditNewData', createNewReditsDataBase );

/*router.post('/reddit', getRedits );

router.delete('/reddit', getRedits );

router.put('/reddit', getRedits );

router.get('/reddit', getRedits );*/

export default router