import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectToMongoDB from './db/connectToMongoDb.js'
import authRoutes from './routes/AuthRoutes.js'

dotenv.config()

const app =express()
const port = 5000

app.use(cors({
    origin : [process.env.ORIGIN],
    methods : ["GET","POST","PUT","PATCH","DELETE"],
    credentials : true,
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(port, ()=>{console.log(`Server running at http://localhost:${port}`),connectToMongoDB()})
