import { database } from "../../index.js";
import Joi from "joi";

async function getMessages(request, response) {
    const user = request.headers.user;
    const limit = request.query.limit;
    const schemaUser = Joi.string().min(1);
    const validateUser = schemaUser.validate(user);
    const allMessages = await database.collection("messages").find({}).toArray();
    const allowedMessages = allMessages.filter((message) => {
        if (message.to === user || message.from === user || message.to === 'Todos') {
            return message
        }
    });

    if (validateUser.error !== undefined) {
        response.status(422).send("Invalid user.");
        return
    }

    if (limit !== undefined) {
        const schemaLimit = Joi.number().integer();
        const validateLimit = schemaLimit.validate(limit);

        if (validateLimit.error !== undefined) {
            response.status(422).send("Invalid limit of messages.");
            return
        }

        response.send(allowedMessages.slice(-validateLimit.value));
        return
    }

    response.send(allowedMessages);
}

export default getMessages;