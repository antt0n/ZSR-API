import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import internalError from "../Http/Response/internal-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
import PatternSender from "../Service/Device/Functionality/pattern.js"
import LedController from "./led-controller.js"

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
        if (isNaN(channelId) || typeof (effect, speed, direction, colorMode) !== "string" || !(["LOW", "MEDIUM", "HIGH"].includes(speed.toUpperCase())) || !(["RIGHT", "LEFT"].includes(direction.toUpperCase())) || !([/* LIST OF EFFECTS HERE*/].includes(effect.toUpperCase()))) {
            badContentError(res)
            return;
        }

        /* ENUM HERE */
        switch (effect) {
            case "RAINBOW":
                effect = 0
                break
        }

        let colorMode;
        switch (effect.toUpperCase()) {
            case "RAINBOW":
            case "TEST":
                colorMode = 0 /* RANDOM */
                break
            case "TATA":
                colorMode = 1 /* ALTERNATING */
        }
        
        if (colorMode === 1) {
            let colors = [body.color1, body.color2, body.color3]
            if (/* ADD HERE CHECK FOR ARRAYS RGB */){
                badContentError(res)
                return
            }
        }
        
        let ledNumber = new LedController().get(channelId);

        try {
            new ChannelRepository().write(pattern, { effect: effect, speed = speed, direction = direction, colorMode = colorMode /* ADD COLOR ARRAY IF NEEDED */ })
            new PatternSender().send(channelId, mode)
            res.status(204).send()
        } 
        catch(err) {
            internalError(res)
            return
        }
    }
}
