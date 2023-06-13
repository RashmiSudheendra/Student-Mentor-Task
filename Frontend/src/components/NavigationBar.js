import React from 'react'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Nav className="me-auto">
          <Link style={{textDecoration: 'none'}} to='/dashboard'>
          <h5 className='text-light m-3'>Dashboard</h5>
          </Link>
          <Link style={{textDecoration: 'none'}} to='/allMentors'>
          <h5 className='text-light m-3'>Mentors</h5>
          </Link>
          <Link style={{textDecoration: 'none'}} to='/showAllStudents'>
          <h5 className='text-light m-3'>Show all Students</h5>
          </Link>
          <Link style={{textDecoration: 'none'}} to='/allMentors'>
          <h5 className='text-light m-3'>Assign Students to Mentor</h5>
          </Link>
          <Link style={{textDecoration: 'none'}} to='/showAllStudents'>
          <h5 className='text-light m-3'>Change Mentor for a Student</h5>
          </Link>
          <Link style={{textDecoration: 'none'}} to='/showAllStudents'>
          <h5 className='text-light m-3'>Previously assign</h5>
          </Link>
        </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar
