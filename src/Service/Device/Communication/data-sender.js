import DeviceManager from "./device-manager.js";

/**
 * Class for send data to the DeviceManager object
 */
export default class DataSender {

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
     * @param {number[]} data
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

export function connectionInit() {
    try {
        return new DataSender(new DeviceManager())
    } catch(err) {
        console.error(err.name + ": " + err.message)
        return false
    }
}

export const dataSender = connectionInit()