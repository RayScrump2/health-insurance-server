const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
app = express()
var url = require('url');

const port = process.env.PORT || 3000
app.use(cors())

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 

// calculate
app.get('/calculate', (req, res) => {
	// Console message
	console.log('Calling /calculate on Node.js server...')

	// Getting the data from the queryString
	var data = url.parse(req.url, true).query
	
	// Parsing the data from the queryString so we can use it
	let age = parseInt(data.age)
	let height = parseInt(data.height)
	let weight = parseInt(data.weight)
	let sysBloodPressure = parseInt(data.sysBloodPressure)
	let diaBloodPressure = parseInt(data.diaBloodPressure)
	// TODO: add cancer, alzherimers, diabetes
	let sum = `Sum of age, height, and weight: ${age+height+weight}`
	res.type('text/plain')
	res.send(sum.toString())
	
});

// Implement a custom About page.
app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('About Node.js on Azure Template.')
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)