import badContentError from "../Http/Response/bad-content-error.js"
import internalError from "../Http/Response/internal-error.js"
import LedclearSender from "../Service/Device/Functionality/ledclear.js"
import LedcleargroupSender from "../Service/Device/Functionality/ledcleargroup.js"

/**
 * Controller for clear led
 */
export default class {

    /**
     * Send clear led (pattern / custom)
     * @param {any} res
     * @param {number} channelId
     * @param {any} body
     */
    update(res, channelId, body) {
        const clearType = body.clearType
        if (isNaN(channelId), typeof clearType !== "string") {
            badContentError(res)
            return;
        }

        switch (clearType.toUpperCase()) {
            case "PATTERN":

                try {
                    new LedclearSender().send(channelId)
                    res.status(204).send()
                }
                catch (err) {
                    internalError(res)
                    return
                }

                break
            case "CUSTOM":

                try {
                    new LedclearSender().send(channelId)
                    new LedcleargroupSender().send(channelId)
                    res.status(204).send()
                }
                catch (err) {
                    internalError(res)
                    return
                }

                break
            default:
                badContentError(res)
                return
        }

        internalError(res)
        return
    }
}
