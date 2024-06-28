import React, { useState } from 'react';
import './FlightSearch.css';

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({ 
    from: '',
    to: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
    // Handle search logic here
  }; 

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="from" value={searchParams.from} onChange={handleChange} placeholder="From" />
      <input type="text" name="to" value={searchParams.to} onChange={handleChange} placeholder="To" />
      <input type="date" name="date" value={searchParams.date} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default FlightSearch;
