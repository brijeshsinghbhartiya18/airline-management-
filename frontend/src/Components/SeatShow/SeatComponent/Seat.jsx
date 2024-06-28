import React from 'react';
import './Seat.css';

const Seat = ({ booked, seatchar, seatindex, seat_Select }) => {
  const handleClick = () => {
    if (booked != 1) {
      seat_Select(seatchar, seatindex);
    }
  };

  const color = booked == 1 ? 'red' : 'green';
  const pointer = booked == 1 ? 'not-allowed' : 'pointer';  
  return (
    <div  
      className='Seat_Actual_Seat' 
      style={{ backgroundColor: color, cursor: pointer }} 
      onClick={handleClick}
    >
      <span>{seatchar}{seatindex}</span>
    </div>
  );  
};
 
export default Seat;
