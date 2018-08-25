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
  const _page = '<!--页面名称：'+ pageName +' 页面路径 '+ rootPath +'-->\r<template>\n  <div class="'+ pageName +'-page">'+ pageName +'</div>\n</template>\n<script type="text/javascript">\n  export default {\n    data() {\n      return{\n\n      }  \n    },\n    computed: {\n\n    },\n    beforeCreate() {\n\n    },\n    created() {\n\n    },\n    beforeMount() {\n\n    },\n    mounted() {\n\n    }, \n    beforeUpdate() {\n\n    }, \n    updated() {\n\n    }, \n    beforeDestroy() {\n\n    },\n    destroyed() {\n\n    }, \n    methods: {\n\n    },\n    watch: {\n\n    }\n  };\n</script>\n<style scoped> \n\n</style>'


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
  // read
  fs.readFile('./projects/'+ projectName +'/src/routerConfig.ts', 'utf-8', function(err, data){
    if(err) {
      console.log(err)
    }
    let fileData = data;

    //  1、先插入import 引用
    const _pageName = pageName.substring(0,1).toUpperCase() + pageName.substring(1);

    const importPosition = fileData.indexOf('const routerConfig');
    const importStr = 'import '+ _pageName +' from "./views/'+ pageName +'.vue";\n\n';
    fileData = insetString(fileData, importStr, importPosition);
    // 2、再插入路由配置
    const routerPosition = fileData.indexOf('export default routerConfig;');
    console.log(routerPosition)
    const routerStr = '    {\n        path: "/'+ pageName +'",\n        component: '+ _pageName +'\n    },\n';
    fileData = insetString(fileData, routerStr, routerPosition - 4);

    // console.log(fileData)
    fs.writeFile('./projects/'+ projectName +'/src/routerConfig.ts', fileData, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });

    //str 原字符串  flg 需要插入的字符串  pos 插入位置
    function insetString(str, targetStr, pos){
      const arrStr = new Array();
      const leftStr = str.substring(0,pos);
      const rightStr = str.substring(pos);
      arrStr.push(leftStr);
      arrStr.push(targetStr);
      arrStr.push(rightStr);
      const newStr = arrStr.join("");
      return newStr
    }
  })



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
