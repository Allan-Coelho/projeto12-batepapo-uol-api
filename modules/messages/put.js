import { database } from "../../index.js";
import { ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";
import Joi from "joi";

async function putMessages(request, response) {
    try {
        const data = request.body;
        const messageID = request.params.messageID;
        const user = stripHtml(request.headers.user).result.trim();
        const usernameSender = await database.collection('participants').findOne({ name: user });
        const schema = Joi.object({
            to: Joi.string().min(1),
            text: Joi.string().min(1),
            type: Joi.string().valid('message', 'private_message')
        });
        const { error, value } = schema.validate(data);
        console.log("opa update")
        if (data.to !== 'Todos') {
            const usernameRecipient = await database.collection('participants').findOne({ name: data.to });

            if (usernameRecipient === null) {
                response.status(422).send("The recipient does not exist.");
                return
            }
        }

        if (error !== undefined) {
            response.status(422).send("Invalid body values.");
            return
        }

        if (usernameSender === null) {
            response.status(404).send("The sender does not exist.");
            return
        }

        if (user === data.to) {
            response.status(404).send("The sender and receipt can't be equal.");
            return
        }

        value.from = user;
        value.text = stripHtml(value.text).result.trim();
        value.to = stripHtml(value.to).result.trim();
        value.type = stripHtml(value.type).result.trim();

        const updatedMessage = await database.collection('messages').updateOne({ _id: new ObjectId(messageID) }, { $set: value });

        if (updatedMessage.matchedCount === 0) {
            response.status(404).send("This message does not exist.");
            return
        }

        response.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}

export default putMessages;