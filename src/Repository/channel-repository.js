import fs from "fs"
import Channel from "../Entity/channel.js" 
import storagePath from "../../storage/storage-path.js"
import RepositoryError from "./repository-error.js"

export default class {
    
    /**
     * Private method to get storage data
     * @returns {Object<number, Channel>}
     */
    #getStorageData() {
        return JSON.parse( fs.readFileSync(storagePath()) )
    }

    /**
     * 
     * @param {number} channelId 
     * @returns {Channel}
     * @throws {RepositoryError}
     */
    read(channelId) {
        const storageData = this.#getStorageData()
        if (storageData.hasOwnProperty(channelId)) {
            return storageData[channelId]
        }
        throw new RepositoryError("Channel not found.")
    }

    /**
     * 
     * @param {number} channelId 
     * @param {(Channel|Object)} data 
     */
    write(channelId, data) {
        const storageData = this.#getStorageData()
        storageData[channelId] = { ...storageData[channelId], ...data }
        return fs.writeFileSync(storagePath(), JSON.stringify(storageData) )
    }

}