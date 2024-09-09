import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { error } from 'console';
import router from './router';

require('dotenv').config(); // load environment variables from .env file
const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());


// create http server
const server = http.createServer(app);
const port = process.env.PORT || process.env.ALT_PORT;

// adding a listener to the server
server.listen(process.env.PORT || process.env.ALT_PORT, () => {
    console.log(`Server is running on http://localhost:${port}/ OR  http://127.0.0.1:${port}/ \nPress CTRL + C to stop the server`);
});

// MongoDB Database connection
const MONGO_URI = 'mongodb+srv://Killercrosx:rze0bTX02OOupNt6@node-restapi-dev.lrapc.mongodb.net/?retryWrites=true&w=majority&appName=node-restapi-dev';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on('error', (error) => {
    console.log(error);
});


// Routes configuration
app.use('/', router());