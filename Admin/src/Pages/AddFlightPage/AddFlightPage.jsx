import React, { useState } from 'react';
import './AddFlightPage.css';

 
const AddFlightPage = () => {
  const [flightData, setFlightData] = useState({
    num: '',
    departcitycode: '',
    departcityname: '',
    departcityairport: '',
    arrivcitycode: '',
    arrivcityname: '',
    arrivcityairport: '',
    departdate: '',
    departtime: '',
    arrivdate: '',
    arrivtime: '',
    seats_count: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Split date and time if necessary
    const postData = {
      num: flightData.num,
      departcitycode: flightData.departcitycode,
      departcityname: flightData.departcityname,
      departcityairport: flightData.departcityairport,
      arrivcitycode: flightData.arrivcitycode,
      arrivcityname: flightData.arrivcityname,
      arrivcityairport: flightData.arrivcityairport,
      depart_date: flightData.departdate.split('T')[0],
      depart_time: flightData.departtime,
      arrive_date: flightData.arrivdate.split('T')[0],
      arrive_time: flightData.arrivtime,
      seats_count: flightData.seats_count,
      price: flightData.price,
    }; 

    try {
      const response = await fetch('http://localhost:3001/add_flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert("Added Successfully")
      console.log('Flight added successfully:', data);
    } catch (error) {
      console.error('Error adding flight:', error);
    } 
  };

  return (
    <div className="add-flight-page">
      <h1>Add Flight</h1>
      <form onSubmit={handleSubmit}>
        <div className="flight-form-grid">
          <input type="text" name="num" value={flightData.num} onChange={handleChange} placeholder="Flight Number" required />
          <input type="time" name="departtime" value={flightData.departtime} onChange={handleChange} required />
          <input type="text" name="departcitycode" value={flightData.departcitycode} onChange={handleChange} placeholder="Departure City Code" required />
          <input type="time" name="arrivtime" value={flightData.arrivtime} onChange={handleChange} required />
          <input type="text" name="departcityname" value={flightData.departcityname} onChange={handleChange} placeholder="Departure City Name" required />
          <input type="number" name="price" value={flightData.price} onChange={handleChange} placeholder="Price" required />
          <input type="text" name="departcityairport" value={flightData.departcityairport} onChange={handleChange} placeholder="Departure City Airport" required />
          <input type="datetime-local" name="departdate" value={flightData.departdate} onChange={handleChange} required />
          <input type="text" name="arrivcitycode" value={flightData.arrivcitycode} onChange={handleChange} placeholder="Arrival City Code" required />
          <input type="datetime-local" name="arrivdate" value={flightData.arrivdate} onChange={handleChange} required />
          <input type="text" name="arrivcityname" value={flightData.arrivcityname} onChange={handleChange} placeholder="Arrival City Name" required />
          <input type="number" name="seats_count" value={flightData.seats_count} onChange={handleChange} placeholder="Seats Count" required />
          <input type="text" name="arrivcityairport" value={flightData.arrivcityairport} onChange={handleChange} placeholder="Arrival City Airport" required />
          <button type="submit">Add Flight</button>
        </div>
        
      </form>
    </div>
  );
};

export default AddFlightPage;