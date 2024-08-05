import  express  from "express";
import {json, urlencoded} from 'body-parser'
import todoRouter from "./routers";

import { globalErrorMiddleware } from './middlewares/error.middleware'

const app = express()
// global middlewares
app.use(urlencoded({extended:false}))
app.use(json())


// global router
app.use('/todo',todoRouter)

app.use(globalErrorMiddleware)

export default app






