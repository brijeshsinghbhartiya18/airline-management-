import React, { useEffect, useState } from 'react'
import './ListFlight.css'
const ListFlight = () => {

  const [flights, setFlights] = useState([]);

  const fetchAllFlights = async () => {
    try {
      const response = await fetch('http://localhost:3001/list_all_flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const data = await response.json();
      setFlights(data || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };


  const Handle_Flight_Delete = async (flight) => {
    try {
      const postData = { items: flight }
      const response = await fetch('http://localhost:3001/delete_flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const data = await response.json();
      console.log(data)
      // alert("Delete Successfully")
      fetchAllFlights();
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  }

  useEffect(() => {
    fetchAllFlights();
  }, [])



  return (
    <div className='ListFlight'>
      <div className="Listflight-container">
        <div className='Listflight-container-Text'><span>ALL FLIGHT</span></div>
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <div key={index} className="Listflight-card">
              <div className='Listflight-card-data'>
                <p><strong>Flight Number:</strong> {flight.Num}</p>
                <p><strong>Departure:</strong> {flight.Departure_City_Name} at {flight.Departure_Time} on {flight.Departure_Date}</p>
                <p><strong>Arrival:</strong> {flight.Arrival_City_Name} at {flight.Arrival_Time} on {flight.Arrival_Date}</p>
              </div>
              <div className='Listcard-delete' onClick={() => Handle_Flight_Delete(flight)}>
                <span>Delete</span>
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming flights</p>
        )}
      </div>
    </div>
  )
}

export default ListFlight
