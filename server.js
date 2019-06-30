const Express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

require('dotenv').config()
const PORT = process.env.PORT || 3001 // Default  fall back port if no port variable is found 
const AZURE_VISION_KEY = process.env.AZURE_VISION_KEY
const server = Express()

const uriBase = 'https://westus.api.cognitive.microsoft.com/vision/v2.0/analyze'
const requestAnalyzeParam = {
    'visualFeatures': 'Categories,Description,Color',
    'details': 'Celebrities',   // The star of the whole website
    'language': 'en'
}
server.use(bodyParser.json({ limit: '50mb'}))
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/', (req, res) => {
    res.send('Backend health check OK')
})

server.post('/api/checkCeleb', (req,res) => {
    
    const base64Image = req.body.imageBinary
    const imageBuffer = Buffer.from(base64Image, 'binary') // Convert binary string to buffer otherwise Azure will deny it
    const option = {
        uri: uriBase,
        qs: requestAnalyzeParam,
        body: imageBuffer,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key' : AZURE_VISION_KEY
        }
    }
    request.post(option, ( error, respsonse, body) => {
        if(error) return console.log(error)
        analyzeImageResult(body)
        return res.sendStatus(200)
    })
})

analyzeImageResult = (result) => {

}

server.listen(PORT, () => console.log(`Server is listerning on port ${PORT}`))