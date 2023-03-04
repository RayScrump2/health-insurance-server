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
	let agePoints, bmiPoints, bpPoints, cancerPoints, diabetesPoints, alzPoints
	let age = parseInt(data.age)
	let height = parseInt(data.height)
	let weight = parseInt(data.weight)
	let sysBloodPressure = parseInt(data.sysBloodPressure)
	let diaBloodPressure = parseInt(data.diaBloodPressure)
	let bmi = (weight * 0.45359237) / (height * 0.0254)**2

	// Adding cancer. alzheimers, and diabetes to receieve data from client - JB
	let cancer = data.cancer === 'Yes' ? true : false
	let alzheimers = data.alzheimers === 'Yes' ? true : false
	let diabetes = data.diabetes === 'Yes' ? true : false

	// Adding points for cancer, alz, and diabetes
	if (cancer) {
		cancerPoints = 10
		sum += cancerPoints
	} else {
		cancerPoints = 0
		sum += cancerPoints
	}

	if (alzheimers) {
		alzPoints = 10
		sum += alzPoints
	} else {
		alzPoints = 0
		sum += alzPoints
	}

	if (diabetes) {
		diabetesPoints = 10
		sum += diabetesPoints
	} else {
		diabetesPoints = 0
		sum += diabetesPoints
	}

	// Calculating points added based on age
	if (age < 30){
		agePoints = 0
		sum += agePoints
	} else if (age >= 30 && age < 45) {
		agePoints = 10
		sum += agePoints
	} else if (age >= 45 && age < 60) {
		agePoints = 20
		sum += agePoints
	} else {
		agePoints = 30
		sum += agePoints
	}

	// Calculating BMI
	if (bmi >= 18.5 && bmi <= 24.9) {
		bmiPoints = 0
		sum += bmiPoints
	} else if (bmi >= 25.0 && bmi <= 29.9) {
		bmiPoints = 30
		sum += bmiPoints
	} else {
		bmiPoints = 75
		sum += bmiPoints
	}

	// Calculating Blood Pressue
	if (sysBloodPressure > 180 || diaBloodPressure > 120){
		bpPoints = 100
		sum += bpPoints
	} else if (sysBloodPressure >= 140 || diaBloodPressure >= 90){
		bpPoints = 75
		sum += bpPoints
	} else if ((sysBloodPressure >= 130 && sysBloodPressure < 140) || (diaBloodPressure >= 80 && diaBloodPressure < 90)){
		bpPoints = 30
		sum += bpPoints
	} else if ((sysBloodPressure >= 120 && sysBloodPressure < 130) && diaBloodPressure < 80){
		bpPoints = 15
		sum += bpPoints
	} else if (sysBloodPressure < 120 && diaBloodPressure < 80) {
		bpPoints = 0
		sum += bpPoints
	}
 
	// Calculating the results
	res.type('text/plain')
	if (sum <= 20) {
		res.send(`Points added based on age: ${agePoints}<br>Points added based on BMI: ${bmiPoints}<br>Points added based on blood pressure: ${bpPoints}<br>
		Points added based on cancer risk: ${cancerPoints}<br>Points added based on diabetes risk: ${diabetesPoints}<br>
		Points added based on alzheimers risk: ${alzPoints}<br>The person's total points is ${sum}, meaning they are at low risk.`)
	} else if (sum > 20 && sum <= 50) {
		res.send(`Points added based on age: ${agePoints}<br>Points added based on BMI: ${bmiPoints}<br>Points added based on blood pressure: ${bpPoints}<br>
		Points added based on cancer risk: ${cancerPoints}<br>Points added based on diabetes risk: ${diabetesPoints}<br>
		Points added based on alzheimers risk: ${alzPoints}<br>The person's total points is ${sum}, meaning they are at moderate risk.`)
	} else if (sum > 50 && sum <= 75) {
		res.send(`Points added based on age: ${agePoints}<br>Points added based on BMI: ${bmiPoints}<br>Points added based on blood pressure: ${bpPoints}<br>
		Points added based on cancer risk: ${cancerPoints}<br>Points added based on diabetes risk: ${diabetesPoints}<br>
		Points added based on alzheimers risk: ${alzPoints}<br>The person's total points is ${sum}, meaning they are at high risk.`)
	} else {
		res.send(`Points added based on age: ${agePoints}<br>Points added based on BMI: ${bmiPoints}<br>Points added based on blood pressure: ${bpPoints}<br>
		Points added based on cancer risk: ${cancerPoints}<br>Points added based on diabetes risk: ${diabetesPoints}<br>
		Points added based on alzheimers risk: ${alzPoints}<br>The person's total points is ${sum}, meaning they are uninsurable`)
	}
});

// Implement a ping
app.get('/ping', (request, response) => {
	console.log('Established connection between Client and Server...')
	response.send()
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