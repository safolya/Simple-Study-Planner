// import React, { useState } from 'react'

// const Signup = () => {
//   let [formData,setFormData]=useState({
//     username:"",
//     email:"",
//     password:""
//   })

//    let handleSubmit=(event)=>{
//      event.preventDefault()
//      console.log(formData)
//      setFormData({
//       username:"",
//       email:"",
//       password:""
//      })
//    }

//    let handleInput=(event)=>{
//      setFormData((currdata)=>{
//       return{...currdata,[event.target.name]:event.target.value}
//      })
//    }

//   return (
//     <>
//     <div>Signup</div>
//     <form onSubmit={handleSubmit}>
//        <input name='username' onChange={handleInput} type="text" placeholder='Username' value={formData.username} /><br />
//        <input name='email' onChange={handleInput} type="email" placeholder='Email' value={formData.email} /><br />
//        <input name='password' onChange={handleInput} type="password" placeholder='Password' value={formData.password} /><br />
//        <button>Submit</button>
//     </form>
//     </>

//   )
// }

// export default Signup

import React from 'react';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/signup", {
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
      alert("Signup successful");

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
      <input type="text" placeholder="Username" {...register("username", { required: true, minLength: 5, maxLength: 20 })} />
      <input type="email" placeholder="Email" {...register("email", { required: true })} />
      <input type="password" placeholder="Password" {...register("password", { minLength: 5, maxLength: 10 })} />

      <input type="submit" />
    </form>
  );
}