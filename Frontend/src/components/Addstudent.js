import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Addstudent() {

  let navigate = useNavigate()
  let [studentName, setStudentName] = useState("")
  let [email, setEmail] = useState("")
  let [mentor, setMentor] = useState("")
  let [batch, setBatch] = useState("")
  let [allMentor, setAllMentor] = useState([])


  let getMentorData = async () => {
    try {
      let res = await axios.get('https://student-mentor-be-g4mt.onrender.com/getAllMentor')
      console.log(res)
      if (res.status === 200) {
        console.log(res.data.data)
        setAllMentor(res.data.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMentorData()
  }, [])

  console.log(allMentor)

  let handleSubmit = async () => {
    let data = {
      studentName,
      email,
      mentor,
      batch
    }
    try {
      let res = await axios.post(`https://student-mentor-be-g4mt.onrender.com/createStudent`, data)
      if (res.status === 201) {
        navigate('/showAllStudents')
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  // console.log(allMentor)
  if (allMentor === "") {
    return (
      <div>
        {/* <p>Calling</p> */}
      </div>
    )
  }
  return (

    <div className='w-100'>
      <p className="mt-5 mb-0 d-flex align-items-center justify-content-center">Task 2: Write a API to create Student</p>
      <h1 className="h3 mt-2 mb-3 text-800 font-weight-bold d-flex align-items-center justify-content-center">New Mentor Details</h1>
      <div className='container-fluid' style={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
        <Form className='w-50'>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" className='border-bottom' value={studentName} placeholder="Enter Name" onChange={(e) => setStudentName(e.target.value)} />
          </Form.Group>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Mentor</Form.Label>
            <select className="form-select" aria-label="Default select example" defaultValue={"Select the mentor"} onChange={(e) => setMentor(e.target.value)}>
              <option selected>Select the mentor</option>
              {
                allMentor.map((ele, i) => { return <option>{ele.name}</option> })
              }
            </select>
            {/* <Form.Control type="text" value={mentor} placeholder="Enter Mentor" onChange={(e)=>setMentor(e.target.value)}/> */}
          </Form.Group>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Batch</Form.Label>
            <Form.Control type="text" value={batch} placeholder="Enter Batch" onChange={(e) => setBatch(e.target.value)} />
          </Form.Group>
          <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
            <Button variant='dark' onClick={() => handleSubmit()}>
              Submit
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link style={{ textDecoration: 'none' }} to='/showAllStudents'>
              <Button variant='dark'>
                Back
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Addstudent
