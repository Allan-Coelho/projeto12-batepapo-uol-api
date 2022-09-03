import { database } from "../../index.js";
import Joi from "joi";
import dayjs from 'dayjs'

async function postParticipants(request, response) {
    const { name } = request.body;
    const schema = Joi.string().min(1);
    const { error, value } = schema.validate(name);
    const usernameAlreadyUsed = await database.collection('participants').findOne({ name: name });
    const now = Date.now();

    if (error !== undefined) {
        response.status(422).send(error.details.message);
    }

    if (usernameAlreadyUsed !== null) {
        response.sendStatus(409);
    }

    database.collection('participants').insertOne({ name: value, lastStatus: now });
    database.collection('messages').insertOne({ from: value, to: 'Todos', text: 'entra na sala...', type: 'status', time: dayjs(now).format('HH:MM:SS') })

    response.sendStatus(201);
}

export default postParticipants;