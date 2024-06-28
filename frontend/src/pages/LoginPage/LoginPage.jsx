import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Navbar from '../../Components/Navbar/Navbar';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [user, setUser] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { email: credentials.email, password: credentials.password };
    try {
      const response = await fetch('http://localhost:3001/get_user_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const responseData = await response.json();
      if (responseData) {
        setUser(responseData);
        navigate("/", { state: { user_info: responseData } });
      } else {
        setUser({})
        alert("User Not Found");
      }
    } catch (error) {
      console.error(error);
      console.log('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar user_info={user} />
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-container">
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"
              className="login-input"
              required
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="login-input"
              required
            />
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
