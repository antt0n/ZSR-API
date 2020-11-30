import fs from "fs"
import storagePath from "./storage-path.js"

/**
 * Check if the storage file exist and create him
 */
export default function() {

  fs.access(storagePath(), fs.F_OK, (err) => {
    if (!err) {
      return
    } else if (err.code == "ENOENT") {
      fs.writeFileSync(storagePath(), "{}");
      return
    }
    // Something to add here
    console.error(err)
    return
  })
}