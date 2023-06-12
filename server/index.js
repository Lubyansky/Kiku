const express = require('express')

const articlesRouter = require('./routes/articlesRoute.js')
const commentsRouter = require('./routes/commentsRoute.js')
const emailsRouter = require('./routes/emailsRoute.js')
const usersRouter = require('./routes/usersRoute.js')
const authRouter = require('./routes/authRoute.js')

const loggerMiddlewares = require('./middlewares/loggerMiddlewares.js')
const errorMiddleware = require('./middlewares/errorMiddleware.js')

const path = require('path')
const config = require('./config.js')
const cors = require("cors");
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const sequelize = require('./db')
const models = require('./models/models')


const PORT = process.env.PORT ?? 5500
const app = express()
const _dirname = path.resolve()

const corsOptions ={
  origin: config.WEB_URL, 
  credentials:true,      
  optionSuccessStatus:200,
}

app.use(express.static(path.resolve(_dirname, 'static')))
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser('SECRET_KEY'));
app.use(fileUpload({}))

app.use(loggerMiddlewares.requestTime)
app.use(loggerMiddlewares.logger)
app.use(errorMiddleware)

app.use('/auth', authRouter)
app.use('/api', articlesRouter, commentsRouter, emailsRouter, usersRouter)

const start = async () => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    //await sequelize.sync({force: true})
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`)
    })
  }
  catch(e){
    console.log(e)
  }
}

start()

app.all('*', function (req, res, next) {
  res.header ("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header ("Access-Control-Allow-Credentials", true);
  next();
});