const Express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const mockResponse = require('./mockRes.json')
const errorRes = require('./errorResMock.json') // Use either these 2 to test out the response without wasting api call for developlment

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
        const result = analyzeImageResult(JSON.parse(body))
        return res.json({ result: result, fullAnalyze: JSON.parse(body) }).status(200)
    })
})

analyzeImageResult = (result) => {
    if (result.code != null) return [`Error: ${result.message}`]
    const imageCategories = result.categories // This will return an array so watch out
    const peoplePatternRegex = /people?.*/g // nasty but what it does is finding all sting that match the name that start with people
    const peopleCategory = imageCategories.filter( element => element.name.match(peoplePatternRegex) )
    let celebArray = [{}] // Dirty hack to create array of object
    let celebNameResult = []
    if(peopleCategory){
        peopleCategory.forEach(element => {
            element.detail.celebrities.forEach(element => { 
                celebArray.push(element)
            })
        })
        celebArray = celebArray.slice(1) // Bad hack to remove the first empty object
        if(celebArray.length > 0){
            celebArray.forEach(element => celebNameResult.push('Azure identified ' + element.name))
            return celebNameResult        
        }
        else {
            return ['Looks like the person you upload is not a celebrity. Perhaps try a picture of Margot Robbie instead']
        }
    }
    return ['Hmm, looks like the image you upload does not contain people in it']
}

server.listen(PORT, () => console.log(`Server is listerning on port ${PORT}`))