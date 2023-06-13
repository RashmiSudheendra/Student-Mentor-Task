const express = require('express')
var cors = require('cors')
const { MongoClient, ObjectId} = require('mongodb')
const app = express()
app.use(express.json())
app.use(cors())
const dbUrl = 'mongodb+srv://studentManagement:studentManagement@cluster0.kslse6m.mongodb.net/'
const client = new MongoClient(dbUrl)
const mongodb = require('mongodb')

// creating new mentor (Working)
app.post('/createMentor', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let mentor = await db.collection("mentorData").findOne({ email: req.body.email })
        if (!mentor) {
            // console.log(req.body)
            await db.collection("mentorData").insertOne(req.body);
            res.status(201).send({ message: 'New mentor created', data: req.body })
        }
        else {
            res.status(400).send({ message: `Mentor with ${req.body.email} already exist` })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all created mentors (Working)
app.get('/getAllMentor', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let mentor = await db.collection("mentorData").find().toArray()
        if (mentor.length == 0) {
            res.status(404).send({ message: 'No mentor created yet !' })
        }
        else {
            res.status(200).send({ data: mentor })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// creating new student (Working)
app.post('/createStudent', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let student = await db.collection("studentData").findOne({ email: req.body.email })
        if (!student) {
            // console.log(req.body)
            await db.collection("studentData").insertOne(req.body);
            res.status(201).send({ message: 'New student created successfully', data: req.body })
        }
        else {
            res.status(400).send({ message: `Student with ${req.body.email} already exist` })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all students (Working)
app.get('/allStudents', async (req, res) => {
    console.log("called")
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let student = await db.collection("studentData").find().toArray()
        if (student.length == 0) {
            res.status(404).send({ message: 'No student created yet !' })
        }
        else {
            res.status(200).send(student)
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// assigning/changing mentor for particular student (Working)
app.put('/assigningMentor/:id', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let student = await db.collection("studentData").findOne({_id:new mongodb.ObjectId(req.params.id)})
        // console.log(student)
        if (student) {
            await db.collection('studentData').updateOne({_id:new mongodb.ObjectId(req.params.id)}, { $set:{ prevMentor: student.mentor } })
            await db.collection('studentData').updateOne({_id:new mongodb.ObjectId(req.params.id)}, { $set:{ mentor: req.body.mentor } })
            res.status(200).send({ message: `mentor assigned`})
        }
        else {
            res.status(404).send({ message: `No student data found` })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all students info for a particular mentor (working)
app.get('/getStudents/:mentor', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        // console.log('connected')
        const db = await client.db("Student_Mentor_Management");
        let student = await db.collection("studentData").find({ mentor: req.params.mentor }).toArray()
        // console.log(student.map((e)=>e.studentName))
        if (student.length==0) {
            res.status(400).send({ message: `No students assigned to ${req.params.mentor}` })
        }
        else {
            res.status(200).send({ data: student.map((e)=>e.studentName) })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting mentor by Id (working)
app.get('/mentor/:id', async (req,res)=>{
    // console.log("called")
    const client = await MongoClient.connect(dbUrl);
    try {
        // console.log('connected')
        const db = await client.db("Student_Mentor_Management");
        let mentor = await db.collection("mentorData").findOne({_id:new mongodb.ObjectId(req.params.id)})
        if (mentor) {
            res.status(200).send({ data: mentor })
        }
        else {
            res.status(404).send({ message: `No mentor data found` })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting student by id (working)
app.get('/student/:id', async (req, res) => {
    // console.log('called')
    const client = await MongoClient.connect(dbUrl);
    try {
        // console.log('connected')
        const db = await client.db("Student_Mentor_Management");
        let student = await db.collection("studentData").findOne({_id:new mongodb.ObjectId(req.params.id)})
        if (student) {
            res.status(200).send({ data: student })
        }
        else {
            res.status(404).send({ message: `No student data found` })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})


// getting students for whom mentor is not assigned (working)
app.get('/studentWithNoMentor', async (req, res) => {
    // console.log("called")
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let student = await db.collection("studentData").find().toArray()
        let std =   student.filter((e)=>e.mentor==='')
        if(std)
        {
            // let stdName = std.map((e)=> e.studentName)
            // let stdId = std.map((e)=> e._id)
                // console.log(stdName)
                res.status(200).send({data : std})
        }
        else
        {
            res.status(404).send({ message: `All students are assigned for mentors` })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})


app.listen(5000, () => console.log(`App is listening to 5000`))