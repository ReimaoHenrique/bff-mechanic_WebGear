import express from 'express';
import cors from 'cors';
import meRoutes from './modules/me/user.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', meRoutes);



export default app;
