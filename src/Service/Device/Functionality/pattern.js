import { dataSender } from "../Communication/data-sender.js"

/**
 * 
 */
export default class {
    /**
     * 
     * @param {number} channel
     * @param {number} mode
     */
    send(channel, mode) {
        dataSender.send([/* EDIT HERE */, channel, mode])
    }  
}
