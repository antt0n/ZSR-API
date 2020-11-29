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
     * @param {number} channel
     * @param {number} luminosity
     */
    post(channel, luminosity) {
        return { message: "TestPost!" }
    }
}