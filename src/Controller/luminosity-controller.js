import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
import RepositoryError from "../Repository/repository-error.js"
import LuminositySender from "../Service/Device/Functionality/luminosity.js"

/**
 * @typedef {Object} LuminosityControllerGetType
 * @property {string} message
 */

/**
 * 
 */
export default class {

    /**
     * 
     * @returns {LuminosityControllerGetType}
     */
    get(res, channelId) {
        try {
            res.send(new ChannelRepository().read(channelId))
        } 
        catch(/** @type {RepositoryError} */ error) {
            notFoundError(res)
            return
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