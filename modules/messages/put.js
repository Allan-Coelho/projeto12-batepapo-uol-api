import { database } from "../../index.js";

async function putMessages(request, response) {
    try {
        const data = request.body;
        const messageID = request.params.messageID;
        const user = request.headers.user;
        const allParticipants = await database.collection("participants").find({}).toArray();

        response.send(allParticipants);
    }
    catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}

export default putMessages;