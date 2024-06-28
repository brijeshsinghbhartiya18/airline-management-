import React, { useState, useEffect } from 'react';
import './BookPage.css';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import FlightUserDetails from '../../Components/FlightUserDetails/FlightUserDetails';
import SeatShow from '../../Components/SeatShow/SeatShow';
import Payment from '../../Components/Payment/Payment';
import Review from '../../Components/Review/Review';
import Rating from '../../Components/Rating/Rating';

const BookPage = () => {
  const { state } = useLocation();
  const user_info = state.pass_user_info;

  if(!user_info || (Object.keys(user_info).length === 0 && user_info.constructor === Object)){
    return (
      <>
    <Navbar user_info={user_info}/>
      phele login kar
      </>
    )
  }

  let prev_items = state.pass_items
  const [items , setitems] = useState(prev_items);
  const [seat, setSeat] = useState('none');
  const HandleSeat = (myseat) => { 
    setSeat(myseat);
  };
  const [temp , settemp] = useState(0)

  const Get_Flight_Data = async () => {
    const postData = {items : prev_items}
    try {  
      const response = await fetch('http://localhost:3001/get_Updated_Flight', {
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
      setitems(responseData[0])
    } catch (error) {
      console.error(error);
      console.log('An error occurred. Please try again.');
    }

  }

  useEffect(() => {
    Get_Flight_Data()
  },[temp])

const Handle_Update_Book_Page = ()=>{
  settemp(temp => temp + 1);
}
 
  return (
    <div className='Complete_Booking'>
      <Navbar user_info={user_info} />
      <div>
        <div className='Flight_Book_Parent'>
          <FlightUserDetails items={items} user_info={user_info} />
        </div>
        <div className='Seat_Select_Parent'>
          <SeatShow items={items} user_info={user_info} getSeat={HandleSeat} />
        </div>
      </div>
      <div className='MakePayment'>
        <Payment items={items} user_info={user_info} selected_seat={seat} Update_Book_Page={Handle_Update_Book_Page} />
      </div> 
      
      <div className='Reiview_Rating'>
        <div className='Review'>
          <Review items={items} user_info = {user_info} Update_Book_Page={Handle_Update_Book_Page}/>
        </div>
        <div className='Rating'>
          <Rating items={items} Update_Book_Page={Handle_Update_Book_Page}/>
        </div>
      </div>

    </div>
  );
};

export default BookPage; 
