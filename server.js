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
const transactionFile = 'transactions.json'
let marketPlace = []
let transactions = []

const marketData = fs.readFileSync(marketplaceFile, 'utf8')
if(marketData) marketPlace = JSON.parse(marketData)

const transactionData = fs.readFileSync(transactionFile, 'utf8')
if(transactionData) transactions = JSON.parse(transactionData)

app.get('/market', (req, res) => {
  res.json(marketPlace)
})

app.get('/market/search', (req, res) => {
  const { q } = req.query
  res.json(searchMarket(q))
})

app.post('/market', (req, res) => {
  const { business } = req.body
  const username = business.username
  const index = marketPlace.findIndex(business => business.username === username)
  console.log(business, index)
  if(index >= 0) {
    marketPlace[index] = business
  } else {
    marketPlace.push(business)
  }
  res.json({ success: true})
  fs.writeFile(marketplaceFile, JSON.stringify(marketPlace), err => {
    if(err) console.log(err)
  })
})

app.post('/hire', (req, res) => {
  const { username, business } = req.body
  transactions.push({
    date: new Date(),
    username,
    business
  })
  console.log(transactions)
  fs.writeFile(marketplaceFile, JSON.stringify(marketPlace), err => {
    if(err) console.log(err)
  })
  res.json({ success: true })
})

app.get('/hire/:username', (req, res) => {
  const { username } = req.params
  // Get matching transactions for user
  const customers = transactions.filter(business => business.username === username)
  // remove transactions from the transaction queue
  transactions = transactions.filter(business => business.username !== username)
  res.json({
    customers
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
