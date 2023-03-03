const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
app = express()
var url = require('url')

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
	let sum = 0
	let age = parseInt(data.age)
	let height = parseInt(data.height)
	let weight = parseInt(data.weight)
	let sysBloodPressure = parseInt(data.sysBloodPressure)
	let diaBloodPressure = parseInt(data.diaBloodPressure)
	let bmi = (weight * 0.45359237) / (height * 0.0254)**2
	// TODO: add cancer, alzherimers, diabetes

	// Calculating points added based on age
	if (age < 30){
		sum += 0
	} else if (age >= 30 && age < 45) {
		sum += 10
	} else if (age >= 45 && age < 60) {
		sum += 20
	} else {
		sum += 30
	}

	// Calculating BMI
	if (bmi >= 18.5 && bmi <= 24.9) {
		sum += 0
	} else if (bmi >= 25.0 && bmi <= 29.9) {
		sum += 30
	} else {
		sum += 75
	}

	// Calculating Blood Pressue
	if (sysBloodPressure >= 180 || diaBloodPressure >= 120){
		sum += 100
	} else if (sysBloodPressure >= 140 || diaBloodPressure >= 90){
		sum += 75
	} else if (sysBloodPressure >= 130 || diaBloodPressure >= 80){
		sum += 30
	} else if (sysBloodPressure >= 120 && diaBloodPressure < 80){
		sum += 15
	}
 
	// Calculating the results
	res.type('text/plain')
	if (sum <= 20) {
		res.send(`The person has ${sum} points, meaning they is at low risk.`)
	} else if (sum > 20 && sum <= 50) {
		res.send(`The person has ${sum} points, meaning they is at moderate risk.`)
	} else if (sum > 50 && sum <= 75) {
		res.send(`The person has ${sum} points, meaning they is at high risk.`)
	} else {
		res.send(`The person has ${sum} points, meaning they is uninsurable.`)
	}
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