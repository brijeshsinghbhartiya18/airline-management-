import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
 
        <h1>AX3-Airlines</h1>
      <nav>
        <ul>
          <li>
            <Link to="/add-flight">Add Flight</Link>
          </li>
          <li>
            <Link to="/list-flights">List Flights</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;