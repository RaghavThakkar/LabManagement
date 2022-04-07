const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser=require('cookie-parser');
const db = require('./database')
const studentRoute = require('./routes/index')
const courseRoute = require('./routes/course')

const app = express()
const apiPort = 3500

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser());

app.use("/api",studentRoute)
app.use("/api/course",courseRoute)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once("open", () => {console.log("DB started successfully")})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
