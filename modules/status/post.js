import { database } from "../../index.js";
import Joi from "joi";

async function postStatus(request, response) {
    try {
        const username = request.headers.user;
        const schemaUser = Joi.string().min(1);
        const validateUser = schemaUser.validate(username);
        const participants = database.collection('participants');
        const now = Date.now();

        if (validateUser.error !== undefined) {
            response.status(422).send("Invalid user.");
            return
        }

        const user = await participants.updateOne({ name: username }, { $set: { lastStatus: now } });

        if (user.matchedCount === 0) {
            response.status(404).send("This user does not exist.");
            return
        }

        response.sendStatus(200);
    }

    catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}

export default postStatus;