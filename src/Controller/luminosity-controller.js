import badContentError from "../Http/Response/bad-content-error.js"
import DataSender from "../Service/Device/Communication/data-sender.js"
import dataSender from "../Service/Device/Communication/data-sender.js"
import DeviceManager from "../Service/Device/Communication/device-manager.js"
import deviceManager from "../Service/Device/Communication/device-manager.js"

/**
 * @typedef {Object} LuminosityControllerGetType
 * @property {string} message
 */

/**
 * 
 */
export default class LuminosityController {

    /**
     * 
     * @returns {LuminosityControllerGetType}
     */
    get() {
        return { message: "Salut!" }
    }

    /**
     * 
     * @param {any} res
     * @param {any} body
     */
    update(res, body) {
        const channel = parseInt(body.channel)
        const luminosity = parseInt(body.luminosity)
        if (isNaN(channel) || isNaN(luminosity) || channel > 7 || channel < 0 || luminosity > 100 || luminosity < 0) {
            badContentError(res)
            return;
        }
    }
}