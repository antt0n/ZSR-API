import fs from "fs"
import storagePath from "./storage-path.js"
import StorageError from "./storage-error.js"

/**
 * Check if the storage file exist and create him
 */
export default function() {
  if (!fs.existsSync(storagePath())){
    fs.mkdirSync(storagePath());
  }
  fs.access(storagePath(), fs.F_OK, (err) => {
    if (!err) {
      return
    } else if (err.code == "ENOENT") {
      fs.writeFileSync(storagePath(), "{}");
      return
    }
    throw new StorageError("Storage initalization impossible.")
  })
}