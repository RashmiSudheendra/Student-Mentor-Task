import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useEffect } from 'react';

function Addmentor() {
  let navigate = useNavigate()
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [qualification, setQualification] = useState("")


  let handleSubmit = async () => {
    let data = {
      name,
      email,
      qualification
    }
    try {
      let res = await axios.post(`https://student-mentor-be-g4mt.onrender.com`, data)
      if (res.status === 201) {
        navigate('/allMentors')
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-100'>
      <h1 className="h3 mt-5 text-800 font-weight-bold d-flex align-items-center justify-content-center">New Mentor Details</h1>
      <p className="mt-2 d-flex align-items-center justify-content-center">Task 1: Write a API to create mentor</p>
      <div className='container-fluid' style={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
        <Form className='w-50'>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" className='border-bottom' value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="text-md mb-3 mx-5">
            <Form.Label>Qualification</Form.Label>
            <Form.Control type="text" value={qualification} placeholder="Enter qualification" onChange={(e) => setQualification(e.target.value)} />
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

export default Addmentor
