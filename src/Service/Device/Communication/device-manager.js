import hid from "node-hid"

import CommunicationError from "./communication-error.js"

/**
 * Class to manage my connection to the device
 */
export default class DeviceManager {

    /** 
     * @type {hid.HID}
     */
    device

    /**
     * @throws {CommunicationError} Errors happens when the device is not plugged in
     */
    constructor() {
        this.device = new hid.HID(0x1c57, 0x7ed0);
        this.device.pause();

        if (!this.device) throw new CommunicationError("Cannot find the device.")
    }

    /**
     * Method for send buffer data to the device
     * @param {Buffer} buffer Buffer who will be send to the device
     */
    sendData(buffer) {
        this.device.write(buffer);
    }

    /**
     * Method for pause the connection with the device
     */
    pause() {
        this.device.pause()
    }

    /**
     * Method for resume the connection with the device
     */
    resume() {
        this.device.resume()
    }

    /**
     * Method for close the connection with the device
     */
    close() {
        this.device.close()
    }
}