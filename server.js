const Express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config
const PORT = process.env.PORT || 3001 // Default  fall back port if no port variable is found 
const AZURE_VISION_KEY = process.env.AZURE_VISION_KEY
const server = Express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/', (req, res) => {
    res.send('Backend health check OK')
})

// TODO: handle post request from the front end

server.listen(PORT, () => console.log(`Server is listerning on port ${PORT}`))