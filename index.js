const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000; // This will be the port that the server is listening on - Brian

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Function for calculating points for age - Brian
function agePoints(age) {
  // Will return a certain amount of points depending on their age - Brian
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

// This will get the data from the client to do the calculations with - Brian
app.post('/', (req, res) => {
  let points = 0;
  const { age, height, weight, sysBloodPressure, diaBloodPressure} = req.body;
  points += agePoints(Number(age));
  res.status(200).send(`The number of points is ${points}.`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});