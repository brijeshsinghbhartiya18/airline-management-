import React, { useState } from 'react'
import FlightCard from '../../Components/FlightCard/FlightCard';
import Navbar from '../../Components/Navbar/Navbar';
import './FlightPage.css'
import { useLocation } from 'react-router-dom';
import arrow from '../../assets/FlightPagePics/arrow.svg'

const FlightPage = () => {
    const [flight_container, setflight_container] = useState([]);
    const [FlightData, setFlightData] = useState({
        from: '',
        to: '',
        date: '',
    });
    const { state } = useLocation();
    const user_info = state.user_info;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { from: FlightData.from, to: FlightData.to, date: FlightData.date };
        try {
            const response = await fetch('http://localhost:3001/get_Flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            const responseData = await response.json();
            setflight_container(responseData)
        } catch (error) {
            console.log("Error in fetching Flighs : ", error);
        }
    }

    return (
        <>
            <Navbar user_info={user_info} />
            <div className="FlighPage">
                <form className="fligh-form" onSubmit={handleSubmit}>
                    <div className="fligh-container">
                        <div className='FROMTO'>
 
                            <input
                                type="text"
                                name="from"
                                value={FlightData.from}
                                onChange={handleChange}
                                placeholder="FROM"
                                className="fligh-input"
                                required
                            />
                            <div className='FlightPage_Arrow'>
                                <img src={arrow} alt="" />
                            </div>
                            <input
                                type="text"
                                name="to"
                                value={FlightData.to}
                                onChange={handleChange}
                                placeholder="TO"
                                className="fligh-input"
                                required
                            />
                        </div>
                        <div >
                            <input
                                type="date"
                                name="date"
                                value={FlightData.date}
                                onChange={handleChange}
                                className="flidgt_date"
                                required
                            />
                        </div>
                    </div>
                    <button className='FlightPageButton' type='submit'>click</button>
                </form>

                <div className='Fligh_Show_Page'>

                    {flight_container.map((item, index) => {
                        return ((flight_container.length != 0) ? <FlightCard key={index} items={flight_container[index]} user_info={user_info} /> : '')
                    })}

                </div>



            </div>
        </>
    )
}

export default FlightPage;
