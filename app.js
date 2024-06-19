require('dotenv').config()
const connectDB = require('./db/connect')

// async errors

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req,res) => {
    res.send('<h1>Store API<h1><a href="/api/v1/products">products route</a>')
})



// products route

const port = 3000

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log();
    }
}

start()