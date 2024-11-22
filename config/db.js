
const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.dB_HOST,
    user: process.env.dB_USER,
    password: process.env.dB_PASSWORD,
    database: process.env.dB_DATABASE,
})

console.log(process.env.DB_DATABASE)
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