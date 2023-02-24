const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000; // This will be the port that the server is listening on - Brian

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// This will get the data from the client to do the calculations with
app.post('/api/data', (req, res) => {
  let points = 0;
  const { age, height, weight, sysBloodPressure, diaBloodPressure} = req.body;

  // converting values
  let weightInKG = Number(weight) * 0.45359237;
  let meters = Number(height) * 0.0254;
  let bmi = weightInKG / meters**2;

  // adding points for each function
  points += agePoints(Number(age)); // calculating age points
  points += bmiPoints(Number(bmi)); // calculating bmi points
  res.status(200).send(`The number of points is ${points}.`); // sending results back to the client **NEED TO MAKE IT SO IT DOESN'T REFRESH CLIENT PAGE**
});

// Function for calculating points for age 
function agePoints(age) {
  // Will return a certain amount of points depending on their age
  if (age < 30) {
    return 0;
  } else if (age >= 30 && age < 45) {
    return 10;
  } else if (age >= 45 && age < 60) {
    return 20;
  } else {
    return 30;
  }
}

// Function for calculating BMI points
function bmiPoints(bmi) {
  // checking bmi levels 
  if (bmi >= 18.5 && bmi < 25.0) {
    return 0;
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return 30;
  } else {
    return 75;
  }
}

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});