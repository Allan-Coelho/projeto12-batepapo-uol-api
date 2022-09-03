import { database } from "../..";

function postMessages(request, response) {
    const data = request.body;
    response.send("OK");
}

export default postMessages;