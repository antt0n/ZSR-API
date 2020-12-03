import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
import RepositoryError from "../Repository/repository-error.js"
import ModeSender from "../Service/Device/Functionality/mode.js"

/**
 * 
 */
export default class {

    /**
     * Get mode informations
     */
    get(res, channelId) {
        try {
            const channelData = new ChannelRepository().read(channelId)
            if (channelData.hasOwnProperty("mode"));
                res.send(channelData.mode)
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
        const mode = parseInt(body.mode)
        if (!(mode instanceof String) || isNaN(channelId) || mode !== "DISABLE" || mode !== "NORMAL" || mode !== "SINK") {
            badContentError(res)
        }
        switch (mode) {
            case "DISABLE":
                mode = 0
                break;
            case "NORMAL":
                mode = 1
                break;
            case "SINK":
                mode = 2
                break;
            default:
                badContentError(res)
        }
        new ChannelRepository().write(channelId, { mode: mode })
        new ModeSender().send(channelId, mode)
    }
}