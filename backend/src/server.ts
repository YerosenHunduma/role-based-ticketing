import express from 'express';
import { config } from 'dotenv';
import { connectDb } from './config/Dbconfig';
import routeRoute from './routes';
import cors from 'cors';
config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routeRoute);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error.message);
    });
