import React from 'react';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';


function Dashboard() {

  let [mentor,setMentor] = useState([])
  let [student,setStudent] = useState([])
  // let navigate = useNavigate()
  
  let getMentorData = async ()=>{
    try{
        let res = await axios.get('https://student-mentor-be-g4mt.onrender.com/getAllMentor')
        console.log(res)
        if(res.status===200)
        {
            console.log(res.data.data)
            setMentor(res.data.data)
        }
    }
    catch(error)
    {
        console.log(error)
    }
    }

    let getStudentData = async ()=>{
      try{
          let res = await axios.get('https://student-mentor-be-g4mt.onrender.com/allStudents')
          // console.log(res)
          if(res.status===200)
          {
              console.log(res.data)
              setStudent(res.data)
          }
      }
      catch(error)
      {
          console.log(error)
      }
      }

      console.log(mentor)
      console.log(student)

    useEffect(()=>{
        localStorage.clear();
        getMentorData ()
        getStudentData ()
    },[])
  return (
    <div className="d-flex flex-row w-100">
      <div id="content-wrapper" className="d-flex flex-column w-50">
        <div id="content" className="container-fluid">
            <h4 className="d-flex justify-content-center m-5 text-lg font-weight-bold">Mentors</h4>
            <div>
                <Table className="table table-borderless table-warning">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Qualification</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mentor.map((e,i)=>{
                        return <tr key={i}>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.qualification}</td>
                        </tr>
                        })
                    }
                </tbody>
                </Table>
            </div>
        </div>
      </div>
      <div id="content-wrapper" className="d-flex flex-column w-50">
        <div id="content" className="container-fluid">
            <h4 className="d-flex justify-content-center m-5 text-lg font-weight-bold">Students</h4>
            <div>
                <Table className="table table-borderless table-primary">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mentor</th>
                        <th>Bentor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((e,i)=>{
                        return <tr key={i}>
                            <td>{e.studentName}</td>
                            <td>{e.email}</td>
                            <td>{e.mentor}</td>
                            <td>{e.batch}</td>
                        </tr>
                        })
                    }
                </tbody>
                </Table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
