import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate,useParams } from 'react-router-dom';
const EditSub = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("No token found, please login");
            return;
        }
        navigate('/subjects');
        try {
            const response = await fetch(`http://localhost:3000/api/v1/edit/subject/${id}`, {
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
            <input type="text" placeholder="Name" {...register("name", { required: true })} />
            <input type="text" placeholder="Code" {...register("code", { required: true })} />
            <input type="submit" />
        </form>
    );
}

export default EditSub