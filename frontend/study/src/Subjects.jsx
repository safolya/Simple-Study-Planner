import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Subjects = () => {
    let[subject,setSubject]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchSubjects=async()=>{
           const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/v1/subject", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setSubject(data.subjects);
    };

    fetchSubjects();
        },[])

    const deleteSubject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(
        `http://localhost:3000/api/v1/delete/subject/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
      setSubject((prevSubjects) =>
        prevSubjects.filter((subject) => subject._id !== id)
      );
    }
    } catch (error) {
      console.error(error);
    }
    
  }; 

  return (
    <div>
      <h2>Subjects</h2>

      {subject.map((subject) => (
        <>
        <div key={subject._id}>
          <div>
          <p>Code: {subject.code}</p>
          <p>Name: {subject.name}</p>
          <button onClick={()=>{navigate(`/create/subjects`)}}>Add Subject</button><br /><br />
          <button onClick={()=>{navigate(`/${subject._id}/topics`)}}>All topics</button><br /><br />
          <button onClick={()=>{navigate(`/edit/${subject._id}/subject`)}}>Edit</button><br /><br />
          <button onClick={()=>{deleteSubject(subject._id)}}>Delete</button><br /><br />
          <Button variant="contained" onClick={()=>{navigate(`/create/${subject._id}/topic`)}}>Add topic</Button>
            </div>
        </div>
        </>
      ))}
    </div>
  )
}

export default Subjects