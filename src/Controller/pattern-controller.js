import badContentError from "../Http/Response/bad-content-error.js"
import notFoundError from "../Http/Response/not-found-error.js"
import internalError from "../Http/Response/internal-error.js"
import ChannelRepository from "../Repository/channel-repository.js"
import PatternSender from "../Service/Device/Functionality/pattern.js"
import LedController from "./led-controller.js"
import RepositoryError from "../Repository/repository-error.js"

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
        if (isNaN(channelId) || typeof effect !== "string" || typeof speed !== "string" || typeof direction !== "string") {
            badContentError(res)
            return;
        }

        // Convert name of effects to an integer

        switch (effect.toUpperCase()) {
            case "RAINBOWWAVE":
                effect = 0
                break
            case "COLORSHIFT":
                effect = 1
                break
            case "COLORPULSE":
                effect = 2
                break
            case "COLORWAVE":
                effect = 3
                break
            case "STATIC":
                effect = 4
                break
            case "VISOR":
                effect = 6
                break
            case "MARQUEE":
                effect = 7
                break
            case "BLINK":
                effect = 8
                break
            case "SEQUENTIAL":
                effect = 9
                break
            case "RAINBOW":
                effect = 10
                break
            default:
                badContentError(res)
                return
        }

        // Convert speed to an integer

        switch (speed.toUpperCase()) {
            case "LOW":
                speed = 2
                break
            case "MEDIUM":
                speed = 1
                break
            case "HIGH":
                speed = 0
                break
            default:
                badContentError(res)
                return
        }

        // Convert direction to an integer

        switch (direction.toUpperCase()) {
            case "RIGHT":
                direction = 0
                break
            case "LEFT":
                direction = 1
                break
            default:
                badContentError(res)
                return
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

        // Set ColorMode according to colors length

        let colorMode;
        if (colors.length > 0) {
            colorMode = 0 // Set manually
        } else {
            colorMode = 1 // Set randomly
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
