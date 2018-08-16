const util = require("util")
const exec = util.promisify(require("child_process").exec)

export const execCMD = async (cmd: String) => await exec(cmd)
