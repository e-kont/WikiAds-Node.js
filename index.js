const express = require('express')
const path = require('path')
const app = express()
const port = 8080
const { v4: uuidv4 } = require('uuid');

const users = require('./models/users')
const favorites = require('./models/favorites')

app.listen(port)

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

users.init()
favorites.init()
let sessionId

app.post('/login', function(req, res){
    sessionId = uuidv4()
    res.status(201).send({"sessionId": sessionId})
    let loggedUser = users.create(req.body.username, req.body.password)
    users.login(loggedUser)
})

app.get('/login', function(req, res){
    res.send({"username": users.getUser().username, "sessionId": sessionId})
})

app.post('/favorites', function(req, res){
    let favoriteAd = favorites.create(req.body.id, req.body.title, req.body.description, req.body.cost, req.body.img, users.getUser().username, sessionId)
    if (!favorites.find(favoriteAd)) { // Check if ad has already been added to favorites
        favorites.save(favoriteAd)
    }
    res.sendStatus(201)
})

app.get('/favorites', function(req, res){
    res.send(favorites.getWishlist())
})