import badContentError from "../Http/Response/bad-content-error.js"

/**
 * @typedef {Object} LuminosityControllerGetType
 * @property {string} message
 */

/**
 * 
 */
export default class {

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