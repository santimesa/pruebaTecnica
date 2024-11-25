import express from 'express'
import config from "./config";

import redditsRoutees from './routers/reddit-routers'

const app = express();


app.set('port',config.port );

app.use(redditsRoutees);

export default app;