const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/lab2',
        {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const index = mongoose.connection

module.exports = index
