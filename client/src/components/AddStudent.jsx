import React, { useState, useContext } from "react";
import "../css/AddStudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "./StudentContext";

const AddStudent = () => {
    const [username, setUsername] = useState('');
    const [studentid, setStudentid] = useState('');
    const [grade, setGrade] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setStudents } = useContext(StudentContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3002/student/register', { username, studentid, grade, status, password })
            .then(res => { 
                if(res.data.registered) {
                    axios.get('http://localhost:3002/student/students')
                        .then(res => {
                            setStudents(res.data);
                            console.log(res.data);
                        })
                        .catch(err => console.error(err));
                    navigate('/dashboard');
                }
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <h2>Student Information</h2>

                <div className="form-group">
                    <label htmlFor="username">Student Name:</label>
                    <input type="text" id="username" name="username" 
                    onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="studentid">Student ID:</label>
                    <input type="text" id="studentid" name="studentid" 
                    onChange={(e) => setStudentid(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="grade">Grade Level:</label>
                    <input type="text" id="grade" name="grade" 
                    onChange={(e) => setGrade(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Activity Status:</label>
                    <input type="text" id="status" name="status" 
                    onChange={(e) => setStatus(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" 
                    onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form-group buttons">
                    <input type="submit" value="Register" />
                    <input type="button" value="Cancel" onClick={handleCancel} />
                </div>
            </form>
        </div>
    );
}

export default AddStudent;
