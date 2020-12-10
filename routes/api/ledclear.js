import { Router } from "express"

import Controller from "../../src/Controller/ledclear-controller.js"
/**
 * Creates the different api routes of the /api/ledclear/* endpoint
 * @param {Router} router Router of the /api/ledclear endpoint
 * @returns {Router} Router of the /api/ledclear endpoint
 */
export default function (router) {

    router.post("/:channelId", (req, res) => {
        new Controller().update(res, req.params.channelId, req.body)
    })

    return router;
}