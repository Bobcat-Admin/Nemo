import * as express from "express"
import * as Response from "../utils/response"
import logger from "../utils/logger"

const router = express.Router()

router.get("/greeting", (req, res) => {
  logger.warn("test for you ")
  Response.respondJSON(res, true, {
    // @ts-ignore
    greeting: `hello, ${req.url}, and more11`,
    // @ts-ignore
    name: req.url
  })
})

export default router
