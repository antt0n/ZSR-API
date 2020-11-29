export default class CommunicationError extends Error {

    constructor(message) {
        this.name = "CommunicationError";
        super(message)
    }

}