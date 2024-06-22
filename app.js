const express = require('express')
const app = express()

require('dotenv').config()
const connectDB = require('./db/connect')

// async errors
require('express-async-errors')
// middleware
app.use(express.json())

const productsRouter = require('./routes/products')
app.use('/api/v1/products', productsRouter)


const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

app.use(notFoundMiddleware)
app.use(errorMiddleware)


// routes
app.get('/', (req,res) => {
    res.send('<h1>Store API<h1><a href="/api/v1/products">products route</a>')
})



// products route

const port = 3000

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