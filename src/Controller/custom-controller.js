import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import internalError from "../Http/Response/internal-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
import CustomSender from "../Service/Device/Functionality/pattern.js"
import RepositoryError from "../Repository/repository-error.js"

/**
 * Controller for custom
 */
export default class {

    /**
     * Get custom data
     */
    get(res, channelId) {
        try {
            const channelData = new ChannelRepository().read(channelId)
            if (channelData.hasOwnProperty("custom")) {
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
     * Update custom data
     * @param {any} res
     * @param {number} channelId
     * @param {any} body
     */
    update(res, channelId, body) {
        if (isNaN(channelId)) {
            badContentError(res)
            return;
        }

        // Create an array (colors) with all colors in body (color1, color2, color3) and check if they are an object with RGB

        let colors = []
        for (let step = 0; step < 4; step++) {
        const counter = "color" + step.toString()
        if (typeof body[counter] == "object") {
            colors.push(body[counter])
          }
        }
        const RGB = ["red", "green", "blue"]

        for (const color of colors) {
            for (const colorRGB of RGB) {
            if (!color.hasOwnProperty(colorRGB) || isNaN(color[colorRGB]) || color[colorRGB] > 255 || color[colorRGB] < 0) {
                badContentError(res)
                return
                }
            }
        }

        // Get ledNumber

        let ledNumber
        try {
            const channelData = new ChannelRepository().read(channelId)
            if (!channelData.hasOwnProperty("ledNumber")) {
                internalError(res)
                return
            }
            ledNumber = channelData.ledNumber
        } 
        catch(error) {
            notFoundError(res)
            return
        }

        // Send data

        try {
            new ChannelRepository().write(channelId, 
                { 
                    pattern: { 
                        effect: effect, 
                        speed: speed, 
                        direction: direction, 
                        colorMode: colorMode,
                        colors: colors
                    } 
                } 
            );
            new PatternSender().send(channelId, {ledNumber: ledNumber, effect: effect, speed: speed, direction: direction, colorMode: colorMode, colors: colors} )
            res.status(204).send()
        } 
        catch(err) {
            console.log(err)
            internalError(res)
            return
        }
    }
}
