import React from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
const CreateTopic = () => {
    const { subjectId } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("No token found, please login");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/v1/create/topics/${subjectId}`, {
                method: "POST",
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
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                ></Box>
            </Box>
            <TextField id="outlined-basic" label="Title" variant="outlined" type="text" placeholder="Title" {...register("title", { required: true })} />
            <TextField id="outlined-multiline-flexible" multiline
                maxRows={4} label="Description" variant="outlined" type="text" placeholder="Description" {...register("description", { required: true })} />
            <input type="submit" />
        </form>
    );
}

export default CreateTopic