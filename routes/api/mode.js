import { Router } from "express"

import Controller from "../../src/Controller/mode-controller.js"
/**
 * Creates the different api routes of the /api/mode/* endpoint
 * @param {Router} router Router of the /api/mode endpoint
 * @returns {Router} Router of the /api/mode endpoint
 */
export default function (router) {

    router.get("/:channelId", (req, res) => {
        new Controller().get(res, req.params.channelId)
    })

    router.post("/:channelId", (req, res) => {
        new Controller().update(res, req.params.channelId,req.body)
    })

    return router;
}