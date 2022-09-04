import { database } from "../../index.js";
import Joi from "joi";
import dayjs from 'dayjs';
import { stripHtml } from "string-strip-html";

async function postParticipants(request, response) {
    try {
        const { name } = request.body;
        const participants = database.collection('participants');
        const messages = database.collection('messages');
        const schema = Joi.string().min(1);
        let { error, value } = schema.validate(name);
        const usernameAlreadyUsed = await participants.findOne({ name: name });
        const now = Date.now();

        if (error !== undefined) {
            response.status(422).send(error.details.message);
            return
        }

        if (usernameAlreadyUsed !== null) {
            response.sendStatus(409);
            return
        }

        value = stripHtml(value).result.trim();

        await participants.insertOne({ name: value, lastStatus: now });
        await messages.insertOne({ from: value, to: 'Todos', text: 'entra na sala...', type: 'status', time: dayjs(now).format('HH:mm:ss') });

        response.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}

export default postParticipants;