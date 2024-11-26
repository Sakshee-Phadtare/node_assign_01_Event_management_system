  const express = require("express");
  const eventRoute = require('./routes/eventRoute');
  // const path = require('path');

  require('dotenv').config();

  const{port} = process.env;
  const app = express();

  //app.use() : middleware used to parse body
  app.use(express.json());

 
  // Routes
  app.use(eventRoute);  

  app.listen(process.env.port, () => {
      console.log(`Server is running on port ${port}`);
    });
    
