const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
const jwt = require('jsonwebtoken');
const secretKey = '123456789';

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


app.post('/login', (req, res) => {
    const user = 'SELECT * FROM students WHERE name = ?';
    var foundUser = null
    connection.query(user, [req.body.name], async (err, result) => {
        foundUser = await result[0]
        console.log(result[0])
        if (result.length > 0 && result[0] == null && result[0] == undefined) {
            res.send({ message: "User does not exist" });
        } else {
            if (result[0].password != req.body.password) {
                res.send({ message: "Password wrong!" })
            } else {
                const token = jwt.sign(result[0], secretKey)
                res.send({ token: token })
            }
        }
    })
});

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization
    const authToken = token && token.split(" ")[1]

    if (authToken == null) {
        return res.send({ message: "Unauthorized Access" })
    } else {
        jwt.verify(authToken, secretKey, (error, data) => {
            if (error) {
                return res.send({ message: "Error in Authorization" })
            } else {
                req.user = data
                next()
            }
        })
    }
}


app.get('/persons', authenticateToken, (req, res) => {
    connection.query('SELECT * FROM `students`', (err, rows, fields) => {
        res.send(rows);
    })
})

app.post('/addPerson', authenticateToken, (req, res) => {
    if (req.user.role == "admin") {
        connection.query(`INSERT INTO students(id, name, age) VALUES ('${req.body.id}','${req.body.name}','${req.body.age}')`, (err, result) => {
            if (err) {
                res.send(err.sqlMessage);
            } else {
                res.send('Person added successfully');
            }

        });
    } else {
        res.send({ message: "YOU ARE NOT ALLOWED BOY" })
    }
});

app.put('/editPerson', authenticateToken, (req, res) => {
    if (req.user.role == "admin") {
        connection.query(`UPDATE students SET name =?, age=? WHERE id=?`, [req.body.name, req.body.age, req.body.id], (err, result) => {
            if (err) {
                res.send(err.sqlMessage);
            } else {
                res.send('Person updated successfully');
            }
        })
    } else {
        res.send({ messaage: "YOU ARE NOT AN ADMIN BIATCH" })
    }
})

app.delete('/deletePerson', authenticateToken, (req, res) => {
    if (req.user.role == "admin") {
        connection.query(`DELETE FROM students WHERE id = ?`, [req.body.id], (err, result) => {
            if (err) {
                res.send(err)
            } else if (result.affectedRows > 0) {
                res.send("Deleted person successfully!")
            } else {
                res.send("Person does not exist!")
            }
        })
    }else{
        res.send({message:"HEY YOU NOT ADMIN"})
    }
})



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
