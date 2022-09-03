import { database } from "../../index.js";
import Joi from "joi";
import dayjs from 'dayjs'

async function postMessages(request, response) {
    try {
        const now = dayjs();
        const data = request.body;
        const usernameSender = await database.collection('participants').findOne({ name: request.headers.from });
        const usernameRecipient = await database.collection('participants').findOne({ name: data.to });
        const schema = Joi.object({
            to: Joi.string().min(1),
            text: Joi.string().min(1),
            type: Joi.string().valid('message', 'private_message')
        });
        const { error, value } = schema.validate(data);

        if (error !== undefined) {
            response.status(422).send("Invalid body values.");
        }

        if (usernameRecipient === null) {
            response.status(404).send("The recipient does not exist.");
        }

        if (usernameSender === null) {
            response.status(404).send("The sender does not exist.");
        }

        if (request.headers.from === data.to) {
            response.status(404).send("The sender and receipt can't be equal.");
        }

        value.from = request.headers.from;
        value.time = now.format('HH:mm:ss')

        database.collection('messages').insertOne(value);

        response.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}

export default postMessages;