import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';

function AssignStudent() {
  let [student, setStudent] = useState([])
  let [id, setId] = useState([])

  const mentorName = localStorage.getItem('mentorName')
  // const id = localStorage.getItem('stdDetails')

  let getStudentData = async () => {
    try {
      let res = await axios.get('https://student-mentor-be-g4mt.onrender.com/studentWithNoMentor')
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
        setStudent(res.data.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  let mentor = mentorName

  let addStudent = async () => {
    let data = {
      mentor
    }
    try {
      await axios.put(`https://student-mentor-be-g4mt.onrender.com/assigningMentor/${id}`, data)
      toast.success(`Student Assigned successfully`)
      setTimeout(function(){
        window.location.reload(1);
     }, 2500);
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getStudentData()
  }, [])

  // console.log(student)
  // console.log(id)

  if (student === " " && id === " ") {
    return (
      <div>

      </div>
    )
  }

  return (
    <div className='w-100'>
      <div className="mt-2 mb-0 d-flex align-items-center justify-content-center">
        <p>Task 3: Write a API to Assign a student to Mentor<br />Select one mentor and Add multiple Student <br />( We can select one mentor and add then select another and add )<br /> ( Shows all the student who is not assigned any mentor )</p>
      </div>
      <h1 className="h3 mt-2 text-800 font-weight-bold d-flex align-items-center justify-content-center">Assign Students to mentor {mentorName}</h1>
      <div className='container-fluid w-50' style={{ display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
        <div className="d-flex justify-content-center">
          <Table className="table table-borderless my-5">
            <tbody>              {
              student.map((e, i) => {
                return <tr key={i} className="d-flex justify-content-center">
                  <td>{e.studentName}</td>
                  <input type='checkbox' className="mt-1" style={{ accentColor: "black" }} onClick={() => {
                    setId(e._id)
                  }} />
                </tr>
              })
            }
            </tbody>
          </Table>
        </div>
        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
          <Button variant='dark' onClick={() => addStudent()} >Add</Button>
          <ToastContainer
            position="top-center"
            autoClose={1500}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ textDecoration: 'none' }} to='/mentorDetails/:name'>
            <Button variant='dark'>
              Back
            </Button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default AssignStudent
