import React from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';

function MentorDetails() {

    let [oneMentor, setOneMentor] = useState([])
    let [student, setStudent] = useState([])
    const mentor = localStorage.getItem('mentorId')
    const mentorName = localStorage.getItem('mentorName')
    console.log(mentor)
    console.log(mentorName)

    let getMentorData = async () => {
        try {
            let res = await axios.get(`https://student-mentor-be-g4mt.onrender.com/mentor/${mentor}`)
            console.log(res)
            console.log(res.data.data)
            if (res.status === 200) {
                // console.log(res.data)
                // console.log(ment)
                setOneMentor(res.data.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    let getStudentData = async () => {
        try {
            let res = await axios.get(`https://student-mentor-be-g4mt.onrender.com/getStudents/${mentorName}`)
            // console.log(res)
            if (res.status === 200) {
                // console.log(res.data)
                setStudent(res.data.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMentorData()
        getStudentData()
    })

    console.log(oneMentor)
    console.log(student)

    if (student === " " && oneMentor === " ") {
        return (
            <div>

            </div>
        )
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-row w-75">
                    <div id="content-wrapper" className="d-flex flex-column w-100">
                        <h4 className="d-flex justify-content-center mt-5 text-lg font-weight-bold">Mentor Details</h4>
                        <div id="content" className="container-fluid d-flex justify-content-between">
                            <div className="d-flex flex-column my-5 mx-3 w-100">
                                <h5 className="d-flex justify-content-center mt-5 text-sm font-weight-bold bg-dark text-light w-25"><em>Profile</em></h5>
                                <p className="mx-2"><em><strong>Name</strong></em> :  {oneMentor.name}</p>
                                <p className="mx-2"><em><strong>Email</strong></em> :  {oneMentor.email}</p>
                                <p className="mx-2"><em><strong>Qualification</strong></em> : {oneMentor.qualification}</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between flex-column my-5 mb-5 mt-0 w-100">
                                <p className="mt-2 mb-0 d-flex">Task 5: Write API to show all students for a particular mentor</p>
                                <h5 className="d-flex justify-content-center mt-2 text-sm font-weight-bold bg-dark text-light w-50">Students Assigned</h5>
                                <div className="d-flex flex-column justify-content-start m-3">
                                {
                                    student.map((e, i) => {
                                        return <React.Fragment key={i}>
                                            <li className="mx-2">{e}</li>
                                        </React.Fragment>
                                    })
                                }
                                    <Link style={{ textDecoration: 'none' }} to='/assignStudent'>
                                        <Button variant='dark' className='mt-3'>
                                            Assign Students
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link style={{ textDecoration: 'none' }} to='/allMentors'>
                                <Button variant='dark'>
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MentorDetails
