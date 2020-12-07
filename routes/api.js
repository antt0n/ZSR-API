import { Router } from "express"

import luminosity from "./api/luminosity.js"
import mode from "./api/mode.js"
import led from "./api/led.js"
import pattern from "./api/pattern.js"

/**
 * Creates the different api routes of the /api/* endpoint
 * @param {Router} router Router of the /api endpoint
 * @returns {Router} Router of the /api endpoint
 */
export default function (router) {

  router.use("/luminosity", luminosity(Router()))
  router.use("/mode", mode(Router()))
  router.use("/led", led(Router()))
  router.use("/pattern", pattern(Router()))

  return router;
}