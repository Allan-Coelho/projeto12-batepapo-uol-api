import { MongoClient } from "mongodb";
import express from 'express';
import dotenv from 'dotenv';
import getMessages from "./modules/messages/get.js";
import postParticipants from './modules/participants/post.js';
import postMessages from './modules/messages/post.js';

dotenv.config();
const server = express();
const mongoClient = new MongoClient(process.env.DATABASE_URI);

server.use(express.json());

await mongoClient.connect();
const database = mongoClient.db('uol_chat');

server.post('/participants', postParticipants);
server.get('/messages', getMessages);
server.post('/messages', postMessages);
server.post('/status', (request, response) => {
    const data = request.body;
    response.send();
});

server.get('/participants', (request, response) => {
    const data = request.body;
    response.send();
});



export { database }
server.listen(5000);