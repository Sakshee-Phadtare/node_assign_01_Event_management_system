const express = require("express");
const eventRoute = require('./routes/eventRoute');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use(eventRoute);

app.listen(2002, () => {
    console.log('Server is running on port 2002');
  });
  
