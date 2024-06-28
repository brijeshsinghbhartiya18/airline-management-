import React, { useEffect, useState } from 'react'
import rupee from '../../assets/FlightCardPics/rupee.svg';
import './FlightUserDetails.css'

const FlightUserDetails = ({ items, user_info }) => {
  return (

    <div className='Book_Parent'>

      <div className="Book_Flight">
        <div className="Book_Flight_Num">{items.Num}</div>
        <div className="Book_Flight_Detail">
          <div className="Book_Depart">
            <div className='Book_Depart_Time'>{items.Departure_Time}</div>
            <div className='Book_Depart_Code'>{items.Departure_City_Code}</div>
            <div className='Book_Depart_Name'>{items.Departure_City_Name}</div>
            <div className='Book_Depart_Airport'>{items.Departure_City_Airport}</div>
          </div>

 
          <div className="Book_Pic">
          <div className='Book_Duration'>duration</div>
          <div className='Book_Single_Line'></div>
          <div><img className='Flight_Card_Little_Plane' width={20} src="https://cdn.iconscout.com/icon/free/png-512/free-airplane-12-84063.png?f=webp&w=256" alt="" /></div>
          </div>

 

          <div className="Book_Arrive">
            <div className='Book_Arrive_Time'>{items.Arrival_Time}</div>
            <div className='Book_Arrive_Code'>{items.Arrival_City_Code}</div>
            <div className='Book_Arrive_Name'>{items.Arrival_City_Name}</div>
            <div className='Book_Arrive_Airport'>{items.Arrival_City_Airport}</div>
          </div>
        </div>
        <div className="Book_Flight_Amount"><img src={rupee} alt="" /><span>{items.Price}</span></div>
      </div>
      <div className="Book_User">
        <div className='Book_User_details'>User</div>
        <div className='Book_User_Name'>{user_info.name}</div>
        <div className='Book_User_Email'>{user_info.email}</div>
        <div className='Book_User_Phone'>{user_info.phone}</div>
      </div>
 
    </div>
  )
}

export default FlightUserDetails
