const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const path = require('path')
const multer = require("multer")
const { MULTI_STATUS } = require("http-status-codes");
const { errors } = require('celebrate')
const mongoose = require('mongoose')
const config = require('./config/confg.json')
const db = require('./config/database.json') // Requring  all esswntials module 

var uri = `mongodb://${db.development.host}:${db.development.port}/${db.development.database}`

// Connecting database   
mongoose.connect(uri)
mongoose.connection.on('error', (err) => console.log(err))
mongoose.connection.on('open', () => console.log("Successfully connected "))

app.use(express.static("./uploads"));
app.use(cors()) // Middleware call 
app.use(express.json())
app.use(errors())
app.use(require('./routes/index'))

const httpServer = http.createServer(app)
    // made india

httpServer.listen(config.port, (err) => console.log("Hello Rupam"))
    //Sever Created