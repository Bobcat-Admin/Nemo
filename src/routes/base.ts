import logger from "../utils/logger"
import * as express from "express"
import * as Response from "../utils/response"
import * as fs from "fs"

const router = express.Router()

router.post("/", async (req, res, next) => {
  const { pageName } = req.body // 页面名称
  const { projectName } = req.body //  项目名称

  logger.info("want to create the page: ", pageName)

  const rootPath = './projects/'+ projectName +'/src/views/'
  const _page = '<!--页面名称：'+ pageName +' 页面路径 '+ rootPath +'-->\r<template>\n  <div class="'+ pageName +'-page"></div>\n<template>\n<script type="text/javascript">\n  export default {\n    data() {\n      return{\n\n      }  \n    },\n    computed: {\n\n    },\n    beforeCreate() {\n\n    },\n    created() {\n\n    },\n    beforeMount() {\n\n    },\n    mounted() {\n\n    }, \n    beforeUpdate() {\n\n    }, \n    updated() {\n\n    }, \n    beforeDestroy() {\n\n    },\n    destroyed() {\n\n    }, \n    methods: {\n\n    },\n    watch: {\n\n    }\n  };\n</script>\n<style scoped> \n\n</style>'


  try {
    // 写入页面
    fs.writeFile('./projects/'+ projectName +'/src/views/'+ pageName +'.vue', _page, function(err) {
      if(err){
        console.log(err)
      }
    })
  } catch (error) {
    return Response.respondJSON(res, false, error.message)
  }
  // 路由
  fs.appendFile('./projects/'+ projectName +'/src/router.ts', 'data to append', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
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
