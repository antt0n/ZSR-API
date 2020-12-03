/**
 * @returns {string} Path of the storage file
 */
export default function() {
    return storageDir() + "storage.json"
}

/**
 * @returns {string} Path of the storage file
 */
export function storageDir() {
    return global.__dirname + "/storage/storage-files/"
}
