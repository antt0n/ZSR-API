import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
import RepositoryError from "../Repository/repository-error.js"

/**
 * 
 */
export default class {

    /**
     * Get led number data
     */
    get(res, channelId) {
        try {
            const channelData = new ChannelRepository().read(channelId)
            if (channelData.hasOwnProperty("ledNumber"));
                res.send(channelData.ledNumber)
            res.send({})
        } 
        catch(/** @type {RepositoryError} */ error) {
            notFoundError(res)
        }
    }

    /**
     * 
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
        new ChannelRepository().write(channelId, { ledNumber: ledNumber })
    }
}