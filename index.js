  const express = require("express");
  const eventRoute = require('./routes/eventRoute');
  const path = require('path');

  require('dotenv').config();


  const app = express();
  app.use(express.json());

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  // Routes
  app.use(eventRoute);

  app.listen(2002, () => {
      console.log('Server is running on port 2002');
    });
    
