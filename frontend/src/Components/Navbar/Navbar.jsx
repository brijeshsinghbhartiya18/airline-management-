import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ user_info }) => {
  const [data, setData] = useState(user_info);

  useEffect(() => {
      setData(user_info);
  }, [user_info]); // Add user_info to the dependency array
  console.log(user_info)
  return (
    <div className="navbar"> 
      <div className="navbar-container">
        <Link state={{ user_info: data }} to="/" className="navbar-logo">Ax3 Airlines</Link>
        <ul className="navbar-nav">
          <li className="navbar-item"><Link state={{ user_info: data }} to="/">Home</Link></li>
          <li className="navbar-item"><Link state={{ user_info: data }} to="/flights">Flights</Link></li>
          <li className="navbar-item user-profile active"><Link state={{ user_info: data }} to="/profile">Profile</Link></li>
          <li className="navbar-item"><Link to="/login">Login</Link></li>
          <li className="navbar-item"><Link to="/signup">Signup</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
