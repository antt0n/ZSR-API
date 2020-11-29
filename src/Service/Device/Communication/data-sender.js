import DeviceManager from "./device-manager.js";

/**
 * Class for send data to the DeviceManager object
 */
export default class {

    /**
     * @type {DeviceManager} 
     */
    connection

    /**
     * @param {DeviceManager} connection 
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     * Method for send data to the DeviceManager
     * @param {Number[]} data
     */
    send(data) {
        const buffer = Buffer.alloc(66);
        buffer[0] = 0;
        data.forEach((entry, index) => {
            buffer[index + 1] = entry;
        });
        this.connection.resume();
        this.connection.sendData(buffer);
        this.connection.pause();
    }
}