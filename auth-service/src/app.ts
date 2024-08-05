import  express  from "express";
import {json, urlencoded} from 'body-parser'
import authRouter from "./routers";

import { globalErrorMiddleware } from './middlewares/error.middleware'

const app = express()
// global middlewares
app.use(urlencoded({extended:false}))
app.use(json())


// global router
app.use('/auth',authRouter)

// global erorr
app.use(globalErrorMiddleware)

export default app






