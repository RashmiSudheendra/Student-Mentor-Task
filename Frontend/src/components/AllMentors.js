import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function AllMentors() {

  let [mentor, setMentor] = useState([])
  let navigate = useNavigate()

  let getMentorData = async () => {
    try {
      let res = await axios.get('https://student-mentor-be-g4mt.onrender.com/getAllMentor')
      console.log(res)
      if (res.status === 200) {
        console.log(res.data.data)
        setMentor(res.data.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    localStorage.clear();
    getMentorData()
  }, [])

  let addmentor = () => {
    navigate('/addmentor')
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-row w-75">
        <div id="content-wrapper" className="d-flex flex-column w-100">
          <div id="content" className="container-fluid">
            <p className="mt-3 mb-0 d-flex align-items-center justify-content-center">Click on mentor to see student list and assign student for mentor</p>
            <h4 className="d-flex justify-content-center m-3 text-lg font-weight-bold">Mentors</h4>
            <div className="d-flex justify-content-center">
              <Table className="table table-borderless my-5 w-50">
                <thead className="table table-borderless table-dark">
                  <tr>
                    <th className="w-25">Name</th>
                    <th className="w-25">Email</th>
                    <th className="w-25">Qualification</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    mentor.map((e, i) => {
                      return <tr key={i} onClick={() => {
                        navigate(`/mentorDetails/:${e.name}`)
                        localStorage.setItem("mentorId", e._id)
                        localStorage.setItem("mentorName", e.name)
                      }}>
                        <td >{e.name}</td>
                        <td >{e.email}</td>
                        <td >{e.qualification}</td>
                      </tr>
                    })
                  }
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-center">
              <Button variant='dark' onClick={() => addmentor()}>
                Add Mentor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllMentors
