import { dataSender } from "../Communication/data-sender.js"

/**
 * 
 */
export default class {
    /**
     * 
     * @param {number} channel
     * @param {object} pattern
     */
    send(channel, pattern) {
        let data = [53, channel, 0, pattern.ledNumber, pattern.effect, pattern.speed, pattern.direction, pattern.colorMode, 255]

        const RGB = ["red", "green", "blue"]
        for (const color of pattern.colors) {
            for (const colorRGB of RGB) {
                data.push(color[colorRGB])
            }
        }
        dataSender.send(data)
    }  
}
