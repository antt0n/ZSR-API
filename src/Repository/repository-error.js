export default class RepositoryError extends Error {

    constructor(message) {
        super(message)
        this.name = "RepositoryError";  
    }

}