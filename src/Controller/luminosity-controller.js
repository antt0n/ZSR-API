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
     * @param {any} body
     */
    update(body) {
        console.log(body)
        return { message: "test" }
    }
}