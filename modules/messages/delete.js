import { database } from "../../index.js";
import { ObjectId } from "mongodb";

async function deleteMessages(request, response) {
    try {
        const data = request.body;
        const messageID = request.params.messageID;
        const user = request.headers.user;
        const messages = database.collection("messages");
        const message = await messages.findOne({ _id: new ObjectId(messageID) });
        console.log(messageID)

        if (message === null) {
            console.log("null")
            response.status(404).send("Message not found.");
            return
        }

        if (user !== message.from) {
            console.log("nao autorizado")
            response.status(401).send("The user can't do this operation.");
            return
        }

        messages.deleteOne({ _id: new ObjectId(messageID) }).then(() => {
            response.sendStatus(200);
        });
    }
    catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}

export default deleteMessages;