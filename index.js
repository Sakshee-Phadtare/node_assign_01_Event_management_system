const express = require("express");
const mysql = require('mysql2');

const app = express();
app.use(express.json());

//db connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Event_Management_System"
})

connection.connect((err)=>{
    if(err)
    {
        console.log("Error in Database connection.")
    }
    else
    {
        console.log("Database connection established.")
    }
})

app.get('/events', async(req, res) => {
    const data = await connection.promise().query('Select * from Events');
    res.json(data[0]);
})

app.post('/events', async(req,res) =>{
    console.log(req.body);
    await connection.promise().query(`insert into Events (name, description, date_time, location) values('${req.body.name}', '${req.body.description}', '${req.body.date_time}', '${req.body.location}' )`);
    res.send(`${req.body.name} has been added to the Database`);
} )

app.delete('/events/:id', async(req,res) =>{
    const { id } = req.params;
    await connection.promise().query(`delete from Events where id='${id}'`);
    res.send(`${id} has been successfully deleted from the Database`);
} )

app.put('/events/:id', async(req,res) =>{
    const { id } = req.params;
    await connection.promise().query(`UPDATE Events
SET name = '${req.body.name}', description = '${req.body.description}', date_time ='${req.body.date_time}', location = '${req.body.location}' WHERE id='${id}'`);
res.send(`${id} has been successfully updated in the Database`);
} )
app.listen(2002);