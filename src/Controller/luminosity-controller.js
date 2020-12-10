import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import internalError from "../Http/Response/internal-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
import LuminositySender from "../Service/Device/Functionality/luminosity.js"

/**
 * Controller for luminosity
 */
export default class {

    /**
     * Get luminosity data
     */
    get(res, channelId) {
        try {
            const channelData = new ChannelRepository().read(channelId)
            if (channelData.hasOwnProperty("luminosity")) {
                res.send(channelData.luminosity)
                return
            }
            res.send({})
        }
        catch (/** @type {RepositoryError} */ error) {
            notFoundError(res)
        }
    }

    /**
     * Update luminosity data
     * @param {any} res
     * @param {number} channelId
     * @param {any} body
     */
    update(res, channelId, body) {
        const luminosity = parseInt(body.luminosity)
        if (isNaN(luminosity) || isNaN(channelId) || luminosity > 100 || luminosity < 0) {
            badContentError(res)
            return;
        }
        try {
            new ChannelRepository().write(channelId, { luminosity: luminosity })
            new LuminositySender().send(channelId, luminosity)
            res.status(204).send()
        }
        catch (err) {
            internalError(res)
            return
        }
    }
}
