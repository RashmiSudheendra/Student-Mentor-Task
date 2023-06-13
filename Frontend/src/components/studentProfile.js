import React from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function StudentProfile() {
    let [student, setStudent] = useState("")

    const id = localStorage.getItem('userId')
    console.log(id)
    let getOneStudentData = async () => {
        try {
            let res = await axios.get(`https://student-mentor-be-g4mt.onrender.com/student/${id}`)
            console.log(res.data)
            if (res.status === 200) {
                // console.log(res.data)
                // let std = res.data.filter((e)=>e._id ===user)
                // console.log(std)
                setStudent(res.data.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOneStudentData()
    })

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-row w-75">
                <div id="content-wrapper" className="d-flex flex-column w-100">
                    <h4 className="d-flex justify-content-center mt-5 text-lg font-weight-bold">Mentor Details</h4>
                    <div id="content" className="container-fluid d-flex justify-content-between">
                        <div className="d-flex flex-column my-5 mx-3 w-100">
                            <h5 className="d-flex justify-content-center mt-5 text-sm font-weight-bold bg-dark text-light w-25"><em>Profile</em></h5>
                            <p className="mx-2"><em><strong>Name</strong></em> :  {student.studentName}</p>
                            <p className="mx-2"><em><strong>Email</strong></em> :  {student.email}</p>
                            <p className="mx-2"><em><strong>Current Mentor</strong></em> : {student.mentor}</p>
                            <p className="mx-2"><em><strong>Previous Mentor</strong></em> : {student.prevMentor} ( Task 6: Write API to show all students for a particular mentor )</p>
                            <p className="mx-2"><em><strong>Batch</strong></em> : {student.batch}</p>
                            <div className="d-flex justify-content-start m-3">
                                <Link style={{ textDecoration: 'none' }} to='/showAllStudents'>
                                    <Button variant='dark'>
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile
