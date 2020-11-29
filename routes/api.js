import { Router } from "express"

import luminosity from "./api/luminosity.js"
/**
 * Creates the different api routes of the /api/* endpoint
 * @param {Router} router Router of the /api endpoint
 * @returns {Router} Router of the /api endpoint
 */
export default function (router) {

  router.use("/luminosity", luminosity(Router()))

  return router;
}