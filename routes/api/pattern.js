import { Router } from "express"

import Controller from "../../src/Controller/pattern-controller.js"
/**
 * Creates the different api routes of the /api/pattern/* endpoint
 * @param {Router} router Router of the /api/pattern endpoint
 * @returns {Router} Router of the /api/pattern endpoint
 */
export default function (router) {

    router.get("/:channelId", (req, res) => {
        new Controller().get(res, req.params.channelId)
    })

    router.post("/:channelId", (req, res) => {
        new Controller().update(res, req.params.channelId, req.body)
    })

    return router;
}