import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Topics = () => {
    let[topics,setTopic]=useState([]);
    const navigate=useNavigate();
    const{subjectId}=useParams();
    useEffect(()=>{
        const fetchSubjects=async()=>{
           const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/v1/${subjectId}/topic`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setTopic(data.topics);
    };

    fetchSubjects();
        },[])
  return (
    <div>
      <h2>Topics</h2>

      {topics.map((topic) => (
        <div key={topic._id}>
            <div>
          <p>Title: {topic.title}</p>
          <p>Description: {topic.description}</p>
           <button onClick={()=>{navigate(`/create/${topic._id}/task`)}}>Add task</button>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Topics