import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EditStudents() {
    let navigate = useNavigate()
    let [allMentor, setAllMentor] = useState([])
    let [studentName,setStudentName] = useState("")
    let [email,setEmail] = useState("")
    let [mentor,setMentor] = useState("")
    let [batch,setBatch] = useState("")
    let [oneStudent, setOneStudent] = useState("")
  
    const user = localStorage.getItem('userDetails')
    console.log(user)

    let getMentorData = async ()=>{
        try{
            let res = await axios.get('https://student-mentor-be-g4mt.onrender.com/getAllMentor')
            // console.log(res)
            if(res.status===200)
            {
                // console.log(res.data.data)
                setAllMentor(res.data.data)
            }
        }
        catch(error)
        {
            console.log(error)
        }
        }

    let getOneStudentData = async ()=>{
        try{
            let res = await axios.get(`https://student-mentor-be-g4mt.onrender.com/student/${user}`)
            console.log(res.data)
            if(res.status===200)
            {
                // console.log(res.data)
                // let std = res.data.filter((e)=>e._id ===user)
                // console.log(std)
                setOneStudent(res.data.data)
            }
        }
        catch(error)
        {
            console.log(error)
        }
        }

    let handleSubmit = async() => {
      let data={
          studentName,
          email,
          mentor,
          batch
      }
          try{
              await axios.put(`https://student-mentor-be-g4mt.onrender.com/assigningMentor/${user}`,data)
                  navigate('/showAllStudents')
          }
          finally{
            navigate('/showAllStudents')
          }
      }

    useEffect(()=>{
        getOneStudentData()
        getMentorData ()
    })
    
      console.log(oneStudent)
      // console.log(allMentor)
    if(allMentor===""&&oneStudent===""){
      return (
        <div>
          {/* <p>Calling</p> */}
        </div>
      )
    }

    return (
      <div className='w-100'>
        <p className="mt-2 d-flex align-items-center justify-content-center">Task 4: Write a API to Assign or change Mentor to particular student</p>
        <h1 className="h3 mt-5 text-800 font-weight-bold d-flex align-items-center justify-content-center">Edit page</h1>
      <div className='container-fluid' style={{display:'flex', flexDirection:"row", justifyContent:'center'}}>
      <Form className='w-50'>
        <Form.Group className="text-md mb-3 mx-5">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" className='border-bottom' defaultValue={oneStudent.studentName} placeholder="Enter Name" onChange={(e)=>setStudentName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="text-md mb-3 mx-5">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" defaultValue={oneStudent.email} placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="text-md mb-3 mx-5">
          <Form.Label>Mentor</Form.Label>
          <select className="form-select" aria-label="Default select example" onChange={(e)=>setMentor(e.target.value)}>
                <option selected>{oneStudent.mentor}</option>
              {
                 allMentor.filter((e) => (e.name !== oneStudent.mentor)).map(ele=>{return <option>{ele.name}</option>})
              }
          </select>
          {/* <Form.Control type="text" value={mentor} placeholder="Enter Mentor" onChange={(e)=>setMentor(e.target.value)}/> */}
        </Form.Group>
        <Form.Group className="text-md mb-3 mx-5">
          <Form.Label>Batch</Form.Label>
          <Form.Control type="text" defaultValue={oneStudent.batch} placeholder="Enter Batch" onChange={(e)=>setBatch(e.target.value)}/>
        </Form.Group>
        <div style={{display:'flex', flexDirection:"row", alignItems:'center', justifyContent:'center'}}>
        <Button variant='dark' onClick={()=>handleSubmit()}>
          Submit
        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default EditStudents
