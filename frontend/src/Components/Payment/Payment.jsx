import React , {useState} from 'react'
import './Payment.css'

const Payment = ({ items, selected_seat, user_info, Update_Book_Page }) => {



  const [bank , setbank] = useState({
    card_num : '',
    card_name : '',
    expiryMM : '',
    expiryYY : '',
    cvv : ''  
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setbank(prevState => ({ ...prevState, [name]: value }));
  };


  const HandlePayment = async (e) => {
    console.log(bank.card_name.length)
    if (selected_seat === 'none') {
      alert("Select Seat")
    } else if(bank.card_name.length == 0 || bank.card_num.length == 0){
      alert("Enter Card Details")
    } else if(bank.expiryMM > 12 || bank.expiryMM < 1){
      alert("Invalid Expiry Month range[1-12]")
    } else if( (bank.expiryYY < 1000 || bank.expiryYY > 9999) ){
      alert("Invalid Expiry Year range[1000-9999] ")
    } else if( (bank.cvv < 100 || bank.cvv > 999) ){
      alert("Invalid cvv range[100-999]")
    }else{
      e.preventDefault();
      const postData = { user_info, items, selected_seat }
      try {
        const response = await fetch('http://localhost:3001/book_flight', {
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
        if (responseData) {
          alert('Flight Succesfully Booked')
          Update_Book_Page()

        } else {
          alert("Error While Booking")
        }

      } catch (error) {
        console.error(error);
        console.log('An error occurred. Please try again.');
      }


    }
  }

  return (
    <div className='Payment_Parent'>
      <div className='Payment_Card_Detail'>
        <div><input type="text" onChange={handleChange} name='card_num' placeholder='Card Number' /></div>
        <div><input type="text" onChange={handleChange} name='card_name' placeholder='Name on Card' /></div>
      </div>
      <div className='Payment_Card_Expiry'>
        <div><input type="text" onChange={handleChange} name='expiryMM' placeholder='Expiry MM' /></div>
        <div><input type="text" onChange={handleChange} name='expiryYY' placeholder='Expiry YY' /></div>
        <div><input type="text" onChange={handleChange} name='cvv' placeholder='CVV' /></div>
      </div>
      <div className='Payment_Payment'>
        <div className='Payment_Total'>Total Amount : {items.Price} </div>
        <div className='Payment_Make' onClick={HandlePayment}><span>Pay</span></div>
      </div>
    </div>
  )
}

export default Payment
