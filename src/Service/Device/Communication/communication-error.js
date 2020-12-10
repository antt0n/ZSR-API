export default class CommunicationError extends Error {

    constructor(message) {
        super(message)
        this.name = "CommunicationError";
    }

}