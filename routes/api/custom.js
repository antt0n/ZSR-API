import { Router } from "express"

import Controller from "../../src/Controller/custom-controller.js"
/**
 * Creates the different api routes of the /api/custom/* endpoint
 * @param {Router} router Router of the /api/custom endpoint
 * @returns {Router} Router of the /api/custom endpoint
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