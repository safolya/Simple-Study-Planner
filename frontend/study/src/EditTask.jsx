import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate,useParams } from 'react-router-dom';
const EditTask = () => {
    const navigate=useNavigate();
    const {taskId}=useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("No token found, please login");
            return;
        }
        navigate('/subjects');
        try {
            const response = await fetch(`http://localhost:3000/api/v1/edit/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data),
            })
            const result = await response.json();

            if (response.ok) {
                console.log(result);
                alert("successful");

            } else {
                alert(result.message);
            }


        } catch (error) {
            console.log(error);
        }
    }
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Task</h2>
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
    );
}

export default EditTask