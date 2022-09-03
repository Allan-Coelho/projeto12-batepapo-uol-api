function getMessages(request, response) {
    const data = request.body;
    response.send("OK");
}

export default getMessages;