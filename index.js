import { MongoClient } from "mongodb";
import express from 'express';
import dotenv from 'dotenv';
import getMessages from "./modules/messages/get.js";
import postParticipants from './modules/participants/post.js';
import postMessages from './modules/messages/post.js';
import getParticipants from './modules/participants/get.js';
import postStatus from './modules/status/post.js';

dotenv.config();
const server = express();
const mongoClient = new MongoClient(process.env.DATABASE_URI);

server.use(express.json());

await mongoClient.connect();
const database = mongoClient.db(process.env.DATABASE_NAME);

server.get('/participants', getParticipants);
server.post('/participants', postParticipants);
server.get('/messages', getMessages);
server.post('/messages', postMessages);
server.post('/status', postStatus);

export { database }
server.listen(process.env.SERVER_PORT);