import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import internalError from "../Http/Response/internal-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
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
            if (channelData.hasOwnProperty("mode")) {
                res.send(channelData.mode)
                return
            }  
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
        let mode = body.mode
        if (isNaN(channelId) || typeof mode !== "string" || !(["DISABLE", "NORMAL", "SINK"].includes(mode.toUpperCase()) )) {
            badContentError(res)
            return;
        }
        switch (mode.toUpperCase()) {
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
                return
        }
        try {
            new ChannelRepository().write(channelId, { mode: mode })
            new ModeSender().send(channelId, mode)
            res.status(204).send()
        } 
        catch(err) {
            internalError(res)
            return
        }
    }
}
