import { Router } from "express"

import api from "./api.js"
import doc from "./doc.js"
/**
 * Dispatches the different entering requests into the API or the DOC 
 * @param {core.Express} app Express app currently running
 */
export default function (app) {

    app.use("/api", api(Router()))
    app.use("/doc", doc(Router()))

    app.all('*', (req, res) => {
        res.status(404).send({
            error: 'This route does not exists !'
        })
    })
}