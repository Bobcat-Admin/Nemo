import * as express from "express"
import { NextFunction, Request, Response } from "express"
import * as path from "path"
import * as favicon from "serve-favicon"
import * as logger from "morgan"
import * as cookieParser from "cookie-parser"
import * as bodyParser from "body-parser"
import { rootDir } from "../config/"
import routes from "../routes"
import { Config } from "../config"

const app = express()

// view engine setup
app.set("views", path.join(rootDir(), "views"))
app.set("view engine", "jade")

// uncomment after placing your favicon in /public
app.use(favicon(path.join(rootDir(), "public", "favicon.png")))
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(Config().session.secret))
// app.use(
//   session({
//     name: Config().session.name,
//     secret: Config().session.secret,
//     saveUninitialized: true,
//     resave: true,
//     cookie: Config().session.cookie,
//     // @ts-ignore
//     store: new RedisStore({
//       client: redis
//     })
//   })
// )
app.use(express.static(path.join(rootDir(), "public")))

app.use("/api/project", routes.project)
app.use("/api", routes.api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found")
  // @ts-ignore
  err.status = 404
  next(err)
})

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  // @ts-ignore
  res.status(err.status || 500)
  res.render("error")
})

export default app
