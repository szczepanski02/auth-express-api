import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRouting from './src/modules/auth/auth.routing';
import userRouting from './src/modules/user/user.routing';

dotenv.config();

// db connect
mongoose.connect(process.env.MONGODB_CONNECT_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
});

// Initialize app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.get('/', (req, res) => {
    res.json({'server': 'Evelto backend is working!'});
});

app.use('/api/auth', authRouting);
app.use('/api/user', userRouting);


app.listen(8080, () => {
    console.log('Server is listening: http://localhost:8080/');
});