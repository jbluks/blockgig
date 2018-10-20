const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const cors = require('cors')

app.use(cors())
app.use(express.static('public/build'))

app.listen(port, ()=> console.log('BlockGig is Alive!'))
