import React from 'react'
import { Link } from 'react-router-dom';
import './FlightCard.css'

import plane_logo from '../../assets/FlightCardPics/plane.svg';
import rupee from '../../assets/FlightCardPics/rupee.svg';

const FlightCard = ({items , user_info}) => {

  function DateDifference(date1, date2) {
    let startDate = new Date(date1);
    let endDate = new Date(date2);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    let diff = endDate - startDate;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days;
}

function TimeDifference(time1, time2) {
  let [hours1, minutes1] = time1.split(':').map(Number);
  let [hours2, minutes2] = time2.split(':').map(Number);
  let startTime = new Date(0, 0, 0, hours1, minutes1);
  let endTime = new Date(0, 0, 0, hours2, minutes2);
  let diff = endTime - startTime;
  if (diff < 0) {
      diff += 24 * 60 * 60 * 1000;
  }
  let hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  let minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  return {
      hours: hours,
      minutes: minutes,
  };
}

  let date_duration = DateDifference(items.Departure_Date , items.Arrival_Date)
  let time_duration = TimeDifference(items.Departure_Time , items.Arrival_Time)

  return ( 
    <div>
   
      <div className='Flight_Card_Parent'>

        <div className='Flight_Card_From_To'>
          <div className='Flight_Card_Location'>
            <div className='Flight_Card_Time'>{items.Departure_Time}</div>
            <div className='Flight_Card_City'>
            <span>{items.Departure_City_Code}</span>
            <span>{items.Departure_City_Name}</span>
            </div>
            <div className='Flight_Card_Airport'>{items.Departure_City_Airport}</div>
          </div>


          <div className='Flight_Card_Pic'>
          <div className='Fligh_Card_Duration'>{`${date_duration} days : ${time_duration.hours} hours:${time_duration.minutes} minutes`}</div>
          <div className='Flight_Card_Single_Line'></div>
          <div><img className='Flight_Card_Little_Plane' width={20} src="https://cdn.iconscout.com/icon/free/png-512/free-airplane-12-84063.png?f=webp&w=256" alt="" /></div>
          </div>
          
          
          <div className='Flight_Card_Location'>
            <div className='Flight_Card_Time'>{items.Arrival_Time}</div>
            <div className='Flight_Card_City'>
            <span>{items.Arrival_City_Code} &nbsp;</span>
            <span>{items.Arrival_City_Name}</span>
            </div> 
            <div className='Flight_Card_Airport'>{items.Arrival_City_Airport}</div>
          </div>
        </div>
 


      <div className='Flight_Amount_Num'>

        <div className='Flight_Card_Number'>
          <div className='Flight_Card_Flight_Num'><div className="Flight_Card_plane_pic"><img src={plane_logo} alt="" /></div> &ensp;<span>{items.Num}</span></div>
        </div>



  
        <div className='Flight_Card_Price'>
          <div className="Flight_Card_Amount"><img src={rupee} alt="" />{items.Price}</div>
          <Link to='/booknow' state = {{pass_items : items , pass_user_info : user_info}}><div className="Flight_Card_Book">Book Now</div></Link>
        </div>
      </div>

      </div>

    </div>
  )
}

export default FlightCard
 