import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
import RepositoryError from "../Repository/repository-error.js"
import LuminositySender from "../Service/Device/Functionality/luminosity.js"

/**
 * 
 */
export default class {

    /**
     * Get luminosity data
     */
    get(res, channelId) {
        try {
            const channelData = new ChannelRepository().read(channelId)
            if (channelData.hasOwnProperty("luminosity"));
                res.send(channelData.luminosity)
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
        const luminosity = parseInt(body.luminosity)
        if (isNaN(luminosity) || isNaN(channelId) || luminosity > 100 || luminosity < 0) {
            badContentError(res)
            return;
        }
        new ChannelRepository().write(channelId, { luminosity: luminosity })
        new LuminositySender().send(channelId, luminosity)
    }
}