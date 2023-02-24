const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/data', (req, res) => {
  try {
    const { number1, number2 } = req.body;
    const result = Number(number1) + Number(number2);
    res.status(200).send(`The sum of ${number1} and ${number2} is ${result}.`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});