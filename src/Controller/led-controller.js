import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import internalError from "../Http/Response/internal-error.js"
import ChannelRepository from "../Repository/channel-repository.js"

/**
 * Controller for led number
 */
export default class {

    /**
     * Get led number data
     */
    get(res, channelId) {
        try {
            const channelData = new ChannelRepository().read(channelId)
            if (channelData.hasOwnProperty("ledNumber")) {
                res.send(channelData.ledNumber)
                return
            }
            res.send({})
        }
        catch (/** @type {RepositoryError} */ error) {
            notFoundError(res)
        }
    }

    /**
     * Update led number for a channel
     * @param {any} res
     * @param {number} channelId
     * @param {any} body
     */
    update(res, channelId, body) {
        const ledNumber = parseInt(body.ledNumber)
        if (isNaN(ledNumber) || isNaN(channelId)) {
            badContentError(res)
            return;
        }
        try {
            new ChannelRepository().write(channelId, { ledNumber: ledNumber })
            res.status(204).send()
        }
        catch (err) {
            internalError(res)
            return
        }
    }
}
