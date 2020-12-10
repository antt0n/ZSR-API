import { dataSender } from "../Communication/data-sender.js"

/**
 * 
 */
export default class {
    /**
     * 
     * @param {number} channel
     */
    send(channel) {
        dataSender.send([59, channel, 1])
    }
}