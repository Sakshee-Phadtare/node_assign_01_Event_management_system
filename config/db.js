
const mysql = require('mysql2')
require('dotenv').config()

const{dB_HOST, dB_USER, dB_PASSWORD, dB_DATABASE} = process.env
const connection = mysql.createConnection({
    host: dB_HOST,
    user: dB_USER,
    password: dB_PASSWORD,
    database: dB_DATABASE,
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