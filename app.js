const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))})
}

const PORT = config.get('port') || 5000

async function start() { 
    try {
        // "mongoUri": "mongodb+srv://FDA:Joker!87@cluster0.hdrscnv.mongodb.net/app_mern?retryWrites=true&w=majority"
        // "mongoUri": "mongodb://localhost:27017/app_mern"
        console.log(config.get('mongoUri'));
        await mongoose.connect(config.get('mongoUri'), {useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) { 
        console.log('Server Error', e.massage);
        process.exit(1)
    }
}

start()