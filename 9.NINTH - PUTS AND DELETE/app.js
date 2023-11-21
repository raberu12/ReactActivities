const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

app.use(express.json())
app.use(cors())

const mysql = require("mysql2")
const res = require('express/lib/response')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webdev'
})

app.get('/persons', (req, res) => {
    connection.query('SELECT * FROM `students`', (err, rows, fields) => {
        res.send(rows);
    })
})

app.post('/addPerson', (req, res) => {
    connection.query(`INSERT INTO students(id, name, age) VALUES ('${req.body.id}','${req.body.name}','${req.body.age}')`, (err, result) => {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            res.send('Person added successfully');
        }
    });
});

app.put('/editPerson', (req, res) => {
    connection.query(`UPDATE students SET name =?, age=? WHERE id=?`, [req.body.name, req.body.age, req.body.id], (err, result) => {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            res.send('Person updated successfully');
        }
    })
})

app.delete('/deletePerson', (req, res) => {
    connection.query(`DELETE FROM students WHERE id = ?`, [req.body.id], (err, result) => {
        if (err) {
            res.send(err)
        } else if(result.affectedRows > 0) {
            res.send("Deleted person successfully!")
        }else{
            res.send("Person does not exist!")
        }
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
