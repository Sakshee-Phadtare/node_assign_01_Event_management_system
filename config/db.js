
const mysql = require('mysql2')
require('dotenv').config()
//destructure variables from process.env
const connection = mysql.createConnection({
    host: process.env.dB_HOST,
    user: process.env.dB_USER,
    password: process.env.dB_PASSWORD,
    database: process.env.dB_DATABASE,
})

connection.connect((error)=>{
    if(error)
    {
        console.log("Error in Database connection.")
    }
    else
    {
        console.log("Database connection established.")
    }
})

module.exports = connection;