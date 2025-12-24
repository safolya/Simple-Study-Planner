import React from 'react'
import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
const CreateTask = () => {
    let [plannedDate, setPlannedDate] = useState("");
    let [status, setStatus] = useState("pending");
    let [notes, setNotes] = useState("");

    const{topicId}=useParams();
     
    const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(topicId);
    const token = localStorage.getItem("token");

    const payload = {
      plannedDate,
      status,
      notes,
    };

    try {
        const response = await fetch(`http://localhost:3000/api/v1/create/tasks/${topicId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if(response.ok){
        alert("succesfull");
        console.log(response);
    }
    } catch (error) {
        console.log(error)
    }

    
  };
    return (
        <>
          <h2>Task</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" value={plannedDate} onChange={(e) => { setPlannedDate(e.target.value) }} />
                <br /><br />

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={status}
                        label="Status"
                        onChange={(e) => { setStatus(e.target.value) }}
                    >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="in-progress">In-Progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                    </Select>

                </FormControl><br /><br />

                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                ></Box>
                <TextField
                    required
                    id="outlined-multiline-flexible"
                    label="Notes"
                    multiline
                    maxRows={4}
                    value={notes}
                    onChange={(e) => { setNotes(e.target.value) }}
                />
                <input type="submit" />
            </form>
        </>
    )
}

export default CreateTask