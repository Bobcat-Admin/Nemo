import logger from "../utils/logger"
import * as express from "express"
import * as Response from "../utils/response"
import * as fs from "fs"
import { execCMD } from "../utils/cmd"

const router = express.Router()
const rootPath = "./projects"

const gitPath = "http://gitlab.zhiyinlou.com/bpit/FETeam/FE-standard.git"

router.post("/", async (req, res) => {
  const { name } = req.body
  logger.info("want to create the project: ", name)

  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath)
  }

  try {
    await execCMD(`git clone ${gitPath} ${rootPath}/${name}`)
    const rmGit = `rm -rf ${rootPath}/${name}/.git`
    const { stdout, stderr } = await execCMD(rmGit)
    logger.info("git clone standard project", stdout, stderr)
  } catch (error) {
    return Response.respondJSON(res, false, error.message)
  }
  return Response.respondJSON(
    res,
    true,
    {
      message: "创建成功"
    },
    201
  )
})

export default router
