import React, { useState } from 'react';
import './SignupPage.css';
import Navbar from '../../Components/Navbar/Navbar';
const SignupPage = () => {

  const [formData, setFormData] = useState({
    name: '', 
    username:'',
    email: '',
    password: '', 
    phoneNumber: '' 
  }); 

  const [user , setuser] = useState({})
  
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {name : formData.name , email : formData.email , password : formData.password , phone : formData.phoneNumber , username : formData.username} 
    try{ 
      const response = await fetch('http://localhost:3001/signup' , {
        method: 'POST',
        headers: { 
          'Content-Type' : 'application/json',
        }, 
        body : JSON.stringify(postData),
      });

      if(!response.ok){
        throw new Error("Responsee was NOT OK....");
      }

      const responseData = await response.text();
      alert("Now Login")
      setuser(responseData)
    }catch(error){
      console.log("Error in SignIn : " , error)
    }

    setIsAuthenticated = true;
  };

  return (
    <>
      <Navbar user_info ={user}/>
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-container">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="signup-input"
            required
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="User Name"
            className="signup-input"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="signup-input"
            required
            />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="signup-input"
            required
          />
          <button type="submit" className="signup-button">Signup</button>
        </div>
      </form>
    </div>
            </>
  );
};

export default SignupPage;
