import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function ShowAllStudents() {

  let [student, setStudent] = useState([])
  let navigate = useNavigate()


  let getStudentData = async () => {
    try {
      let res = await axios.get('https://student-mentor-be-g4mt.onrender.com/allStudents')
      // console.log(res)
      if (res.status === 200) {
        // console.log(res.data)
        setStudent(res.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  // console.log(student)

  useEffect(() => {
    localStorage.clear();
    getStudentData()
  }, [])

  let addStudent = () => {
    navigate('/addStudent')
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-row w-75">
        <div id="content-wrapper" className="d-flex flex-column w-100">
          <div id="content" className="container-fluid">
            <p className="mt-3 mb-0 d-flex align-items-center justify-content-center">Click on edit icon to assign mentor<br/>Click on profile icon to show previous Mentor</p>
            <h4 className="d-flex justify-content-center mb-3 mt-2 text-lg font-weight-bold">Students</h4>
            <div>
              <Table className="table table-borderless my-5">
                <thead className="table table-borderless table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mentor</th>
                    <th>Batch</th>
                    <th className="d-flex justify-content-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    student.map((e, i) => {
                      return <tr key={i}>
                        <td>{e.studentName}</td>
                        <td>{e.email}</td>
                        <td>{e.mentor}</td>
                        <td>{e.batch}</td>
                        <td className="d-flex justify-content-center">
                          <div><i className="fas fa-light fa-pen-to-square" onClick={() => {
                            navigate(`/editStudents/${e._id}`)
                            localStorage.setItem("userDetails", e._id)
                          }}>
                          </i></div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <div>
                            <i className="fas fa-duotone fa-user"
                              onClick={() => {
                                navigate(`/StudentProfile/${e._id}`)
                                localStorage.setItem("userId", e._id)
                              }}>
                            </i></div>
                          {/* style={{"--fa-primary-color": "#000000", "--fa-secondary-color": "#000000"}} */}
                        </td>
                      </tr>
                    })
                  }
                </tbody>
              </Table>
              <div className="d-flex justify-content-center">
                <Button variant='dark' onClick={() => addStudent()}>
                  Add Student
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowAllStudents
