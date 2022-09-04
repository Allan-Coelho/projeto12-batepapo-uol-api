import { database } from "../../index.js";
import dayjs from 'dayjs'

async function activeParticipants() {
    try {
        const now = Date.now();
        const participants = database.collection('participants');
        const messages = database.collection('messages');
        const allParticipants = await participants.find({}).toArray();

        for (let i = 0, len = allParticipants.length; i < len; i++) {
            const participant = allParticipants[i];

            if ((now - participant.lastStatus) > 10000) {
                participants.deleteOne({ name: participant.name }).then(() => {
                    messages.insertOne({ from: participant.name, to: 'Todos', text: 'sai da sala...', type: 'status', time: dayjs(now).format('HH:mm:ss') });
                });
            }
        }
    }

    catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}

export default activeParticipants;