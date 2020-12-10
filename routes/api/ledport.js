import { Router } from "express"

import Controller from "../../src/Controller/ledport-controller.js"
/**
 * Creates the different api routes of the /api/ledport/* endpoint
 * @param {Router} router Router of the /api/ledport endpoint
 * @returns {Router} Router of the /api/ledport endpoint
 */
export default function (router) {

    router.post("/:channelId", (req, res) => {
        new Controller().update(res)
    })

    return router;
}