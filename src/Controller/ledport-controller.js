import badContentError from "../Http/Response/bad-content-error.js"
import internalError from "../Http/Response/internal-error.js"
import LedportSender from "../Service/Device/Functionality/ledport.js"

/**
 * Controller for LedPortType
 */
export default class {

    /**
     * Send LedPortType
     * @param {any} res
     * @param {number} channelId
     * @param {any} body
     */
    update(res, channelId) {
        if (isNaN(channelId)) {
            badContentError(res)
            return;
        }
        try {
            new LedportSender().send(channelId)
            res.status(204).send()
        } 
        catch(err) {
            internalError(res)
            return
        }
    } 
}
