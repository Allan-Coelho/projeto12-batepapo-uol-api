import { MongoClient } from "mongodb";
import express from 'express';
import dotenv from 'dotenv';
import getMessages from "./modules/messages/get.js";
import postParticipants from './modules/participants/post.js';
import postMessages from './modules/messages/post.js';
import getParticipants from './modules/participants/get.js';
import postStatus from './modules/status/post.js';
import activeParticipants from "./modules/participants/activeParticipants.js";
import cors from 'cors';
import deleteMessages from './modules/messages/delete.js'
import putMessages from './modules/messages/put.js'

dotenv.config();
const server = express();
const mongoClient = new MongoClient(process.env.DATABASE_URI);

server.use(express.json()).use(cors());

await mongoClient.connect();
const database = mongoClient.db(process.env.DATABASE_NAME);

server.get('/participants', getParticipants);
server.post('/participants', postParticipants);
server.get('/messages', getMessages);
server.post('/messages', postMessages);
server.delete('/messages/:messageID', deleteMessages);
server.put('/messages/:messageID', putMessages);
server.post('/status', postStatus);

setInterval(activeParticipants, 15000)

export { database }
server.listen(process.env.SERVER_PORT);