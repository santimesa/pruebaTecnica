import express from 'express';
import config from './config';
import cors from 'cors';

import redditsRoutes from './routers/reddit-routers';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200', // Permite solo este origen (frontend Angular)
  methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
  allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
};

// Habilita CORS con las opciones especificadas
app.use(cors(corsOptions));

app.set('port', config.port);

// Middleware para las rutas
app.use(redditsRoutes);

export default app;
