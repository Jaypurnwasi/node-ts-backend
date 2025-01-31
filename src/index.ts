import express from 'express'
import { Application,Request,Response } from 'express-serve-static-core'
import dotenv from 'dotenv'
import connect from './config/connect.js'
import router from './routes/userRoutes.js'


const app:Application = express()
app.use(express.json())
dotenv.config()
app.use(router)

connect()

app.listen(process.env.PORT,()=>{
    console.log(`server started at port a ${process.env.PORT}`)
})

app.get('/',(req:Request,res:Response)=>{
    
     res.send("welcome to home page")
})


export{} 