import { database } from "../../index.js";

async function getParticipants(request, response) {
    const data = request.body;
    const allParticipants = await database.collection("participants").find({}).toArray();

    response.send(allParticipants);
}

export default getParticipants;