import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import internalError from "../Http/Response/internal-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
import PatternSender from "../Service/Device/Functionality/pattern.js"

/**
 * 
 */
export default class {

    /**
     * Get pattern informations
     */
    get(res, channelId) {
        try {
            const channelData = new ChannelRepository().read(channelId)
            if (channelData.hasOwnProperty("pattern")) {
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
        let effect = body.effect
        let speed = body.speed
        let direction = body.direction
        let colorMode = body.colorMode
        let colors = [body.color1, body.color2, body.color3]
        if (isNaN(channelId)) {
            badContentError(res)
            return;
        }
        //let ledNumber = ;

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
