const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(express.json()) //allows for parsing

let list=[
    {id:1,name:"Patrick",age:27},
    {id:2,name:"Ean",age:28},
    {id:3,name:"Gran",age:29}
]

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/persons/:id', (req, res) => {
    console.log(req.params.id)
    const peeps = list.find((x)=>x.id == req.params.id)

    res.send(JSON.stringify(peeps))
})

app.get('/persons', (req, res) =>{
    res.send(list)
})

app.post('/addStudents', (req, res) => {
    console.log("Run")
    if (req.body.name != undefined && req.body.age != undefined) {
        list.push(req.body)
        res.status(200).send({message:"Called Success", statusCode:200})
    } else{
        res.status(400).send({message:"Error Data Incomplete!"})
    }

})

app.delete('/deleteStudents/:id', (req, res) => {
    const studID = req.params.id
    const index = list.findIndex(student => student.id == studID)
    if(index !== -1){
        list.splice(index, 1)
        res.status(200).send({message:"Student Deleted", statusCode:200})
    }else{
        res.status(404).send({message:"Student not found", statusCode:404})
    }
})

app.put('/editStudents/:id', (req, res) => {
    const studID = req.params.id
    const {name, age} = req.body

    const student = list.find(student => student.id == studID)
    if(student){
        student.name = name
        student.age = age
        res.status(200).send({message: "Student Updated", statusCode:200})
    }else{
        res.status(404).send({message: "Student not Found", statusCode:404})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`THE THING IS RUNNING BROTHER`)
})
