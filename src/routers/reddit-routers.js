import { Router } from "express";

import {getRedits,createNewReditsDataBase} from '../controllers/reddit-controller';

const router = Router();

router.get('/reddit', getRedits );

router.post('/redditNewData', createNewReditsDataBase );


export default router