/**
 * @returns {string} Path of the storage file
 */
// try an export default const, but problem with global var (only into modules)
export default function() {
    return global.__dirname + "/storage/storage-files/storage.json"
}
