import { database } from "../../index.js";

async function getParticipants(request, response) {
    try {
        const data = request.body;
        const allParticipants = await database.collection("participants").find({}).toArray();

        response.send(allParticipants);
    }
    catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}

export default getParticipants;