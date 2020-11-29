import badContentError from "../Http/Response/bad-content-error.js"

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
        if (isNaN(parseInt(body.channel)) || isNaN(parseInt(body.luminosity))) {
            badContentError(res)
            return;
        }
        
    }
}