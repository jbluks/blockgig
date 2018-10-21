const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.static('public/build'))
app.use(bodyParser.json())

const marketplaceFile = 'marketplace.json'
let marketPlace = []

const data = fs.readFileSync(marketplaceFile, 'utf8')
if(data) marketPlace = JSON.parse(data)

app.get('/market', (req, res) => {
  res.json(marketPlace)
})

app.get('/market/search', (req, res) => {
  const { q } = req.query
  res.json(searchMarket(q))
})

app.post('/market', (req, res) => {
  const { business } = req.body
  marketPlace.push(JSON.parse(business))
  res.json({ success: true})
  fs.writeFile(marketplaceFile, JSON.stringify(marketPlace), err => {
    if(err) console.log(err)
  })
})

app.listen(port, () => {
  console.log(`BlockGig is alive at ${port}!`)
  console.log(marketPlace)
})

function searchMarket(query) {
  return marketPlace.filter(business =>
    business.skills.find(skill => skill.toLowerCase().includes(query.toLowerCase()))
  )
}
