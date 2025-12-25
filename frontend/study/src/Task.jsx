import React from 'react'

import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Task = () => {
    let[tasks,setTask]=useState([]);
    const navigate=useNavigate();
    const{topicId}=useParams();
    useEffect(()=>{
        const fetchSubjects=async()=>{
           const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/v1/${topicId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setTask(data.task);
    };

    fetchSubjects();
        },[])
  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div key={task._id}>
            <div>
          <p>Planned: {task.plannedDate}</p>
          <p>Status: {task.status}</p>
          <p>Notes: {task.notes}</p>
            </div>
            <button onClick={()=>{navigate(`/edit/${task._id}/task`)}}>Edit</button>
        </div>
      ))}
    </div>
  )
}

export default Task