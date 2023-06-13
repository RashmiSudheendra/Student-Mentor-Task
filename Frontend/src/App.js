import './App.css';
import {Routes, Route} from "react-router-dom";
import Addmentor from './components/Addmentor';
import Addstudent from './components/Addstudent';
import AllMentors from './components/AllMentors';
import AssignStudent from './components/AssignStudent';
import Dashboard from './components/Dashboard';
import ShowAllStudents  from "./components/ShowAllStudents";
import EditStudents from './components/EditStudents';
import MentorDetails from './components/MentorDetails';
import StudentProfile from './components/studentProfile';
import NavigationBar from './components/NavigationBar';


function App() {

  return (
    <>
    <NavigationBar/>
      <div>
        <Routes>
          <Route path= "/addmentor" element={<Addmentor/>}/>
          <Route path= "/addstudent" element={<Addstudent/>}/>
          <Route path= "/allMentors" element={<AllMentors/>}/>
          <Route path= "/assignStudent" element={<AssignStudent/>}/>
          <Route path= "/showAllStudents" element={<ShowAllStudents/>}/>
          <Route path= "/editStudents/:id" element={<EditStudents/>}/>
          <Route path= "/mentorDetails/:name" element={<MentorDetails/>}/>
          <Route path= "/StudentProfile/:name" element={<StudentProfile/>}/>
          <Route path= "/dashboard" element={<Dashboard/>}/>
          <Route path='*' element={<Dashboard/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
