import React from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json();
      
      if (response.ok) {
      // store token
      localStorage.setItem("token", result.token);
      alert("Login successful");

    } else {
      alert(result.message);
    }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register("email", { required: true })} />
      <input type="password" placeholder="Password" {...register("password")} />
      <input type="submit" />
    </form>
  );
}