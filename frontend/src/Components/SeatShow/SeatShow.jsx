import React, { useState } from 'react'
import './SeatShow.css'
import Seat from './SeatComponent/Seat';
 
const SeatShow = ({ items, getSeat }) => {

    let seat_arrange = [];
    var j = 0;
    for (var i = 0; i < items.Seats_count; i++) {
        if (!seat_arrange[j]) {
            seat_arrange[j] = [];
        }
        seat_arrange[j].push([items.Seats[i].SeatChar, items.Seats[i].SeatIndex, items.Seats[i].SeatStatus]);
        if ((i + 1) % 4 == 0) {
            j++;
        }
    } 
 
  
    const [selectedSeats, setSelectedSeats] = useState("none");

    const handleSeatSelect = (seatchar, seatindex) => {
        setSelectedSeats(`${seatchar}${seatindex}`);
        getSeat(`${seatchar}${seatindex}`) 
    };
    const handleSeatDeSelect = () => {
        setSelectedSeats("none")
        getSeat("none")
    }

    


    return (
        <div className='SeatShow_Parent'>

            <div className='SeatShow_Info'>
                <div className='Seat_Book_Look Sample_Red'><Seat booked={1} seatchar={''} seatindex={''} /> <span> : Booked</span> </div>
                <div className='Seat_Not_Book_Look Sample_Green'><Seat booked={0} seatchar={''} seatindex={''} /> <span> : Available</span> </div>
                <div className="Seat_Selected"><span>Selected Seat : &nbsp;</span>{selectedSeats}</div>
                <div className="Seat_DeSelect" onClick={handleSeatDeSelect}>DESELECT</div>
            </div>
            <div className='SeatShow_Seats'>

                <div className='SeatShow_Back'><span>FRONT</span></div>
                <div className='SeatShow_Middle'>
                     
                {
                    seat_arrange.map((row, rowindex) => (
                        <div key={rowindex} className='SeatShow_row'>
                            {
                                row.map((seat, seatindex) => (
                                    <div key={seatindex} className="SeatShow_index">
                                        <Seat booked={seat[2]} seatchar={seat[0]} seatindex={seat[1]} seat_Select={handleSeatSelect} />
                                    </div>
                                )) 
                                }
                        </div>
                    ))
                    }
                </div>
                <div className='SeatShow_Front'><span>BACK</span></div>
            </div>

        </div>
    )
}

export default SeatShow
