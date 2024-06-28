import React, { useState , useEffect } from 'react';
import './ProfilePage.css'; 
import Navbar from '../../Components/Navbar/Navbar';
 

const ProfilePage = ({ user_info }) => {
  console.log(user_info)
  if(!user_info || (Object.keys(user_info).length === 0 && user_info.constructor === Object)){
    return (
      <>
    <Navbar user_info={user_info}/>
      phele login kar
      </>
    )
  }

  const { email, password } = user_info;
  const [flights, setFlights] = useState([]);
  const [temp, settemp] = useState(0)

  const fetchUpcomingFlights = async () => {
    try {
      const response = await fetch('http://localhost:3001/get_user_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const data = await response.json();
      console.log(data.presentbook)
      setFlights(data.presentbook || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const Handle_Cancle_Flight = async (flight , user_info) =>{
    try {
      const postData = {items : flight , user_info : user_info}
      const response = await fetch('http://localhost:3001/cancle_flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      console.log(response)
      settemp(temp+1)
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  }

  useEffect(() => {
    fetchUpcomingFlights()
  }, [temp])
  

 
  return (
    <>
    <Navbar user_info={user_info}/>
    <div className="profile-page">
      <div className="profile-container">
        <h1>User Profile</h1>
        <div className="profile-details">
          <p><strong>Name:</strong> {user_info.name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {user_info.phone}</p>
          <p><strong>Username:</strong> {user_info.username}</p>
        </div>
        <button className="fetch-flights-button" onClick={fetchUpcomingFlights}>
          Show Upcoming Flights
        </button>
        <div className="flights-container">
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <div key={index} className="flight-card">
                <div className="flightcard_1">
                <p><strong>Flight Number:</strong> {flight.Num}</p>
                <p><strong>Departure:</strong> {flight.Departure_City_Name} at {flight.Departure_Time} on {flight.Departure_Date}</p>
                <p><strong>Arrival:</strong> {flight.Arrival_City_Name} at {flight.Arrival_Time} on {flight.Arrival_Date}</p>
                <p><strong>Seat:</strong> {flight.Seat}</p>
                </div>
                <div className="flight_cancle" onClick={()=>{Handle_Cancle_Flight(flight , user_info)}}>
                  <span>Cancle</span>
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming flights</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;