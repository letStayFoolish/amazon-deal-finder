const data = require('./data')
require('dotenv').config()
const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const username = process.env.USERNAME
const password = process.env.PASSWORD

// Routing
app.get('/deals', async (req, res) => {
  try {
    const body = {
      'source': 'universal_ecommerce',
      'url': 'https://www.ebay.com/itm/293608130360',
      'geo_location': 'United States'
    };

    const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
      }
    })

    // const data = await response.json()
    const results = data.results[0].content.results.organic
    const filteredDeals = results.filter(deal => deal.price_strikethrough)
    const sortedByBestDeal = filteredDeals.sort((b, a) =>
      ((a.price_strikethrough - a.price) / a.price_strikethrough * 100) - ((b.price_strikethrough - b.price) / b.price_strikethrough * 100)
    )
    res.send(sortedByBestDeal)

  } catch(err) {
    console.error(err)
  }
})


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})