import logger from "../utils/logger"
import * as express from "express"
import * as Response from "../utils/response"
import * as fs from "fs"
import { execCMD } from "../utils/cmd"

const router = express.Router()

router.post("/", async (req, res, next) => {
  const { name } = req.body // 页面名称
  const { project } = req.body //  项目名称
  logger.info("want to create the project: ", name)
  const rootPath = './projects/'+ project +'/src/views/'
  const _page = '<!--页面名称：'+ name +' 页面路径 '+ rootPath +'--><template><div class="xxx-page"></div><template><script type="text/javascript">export default {  data() {    return {      }    };  },  computed: {  },  beforeCreate() {  },  created() {  },  beforeMount() {  },  mounted() {  },  beforeUpdate() {  },  updated() {  },  beforeDestroy() {  },  destroyed() {  },  methods: {  },  watch: {  }};</script><style scoped> </style>'


  try {

    fs.writeFile('./projects/'+ project +'/src/views/'+ name +'.vue', _page, function(err) {
      if(err){
        console.log(err)
      }
    })

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
