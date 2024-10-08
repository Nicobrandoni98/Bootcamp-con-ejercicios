const express = require('express')
const app = express()
const cors = require('cors')
const blogRouters = require ('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouters)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app