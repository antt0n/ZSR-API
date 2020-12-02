import { dataSender } from "../Communication/data-sender.js"

/**
 * 
 */
export default class {
    /**
     * 
     * @param {number} channel
     * @param {number} luminosity
     */
    send(channel, luminosity) {
        dataSender.send([57, channel, luminosity])
    }
}