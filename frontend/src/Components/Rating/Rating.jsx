import React, { useState } from 'react'
import './Rating.css'
import star from '../../assets/RatingStar/star.svg'

const Rating = ({ items, Update_Book_Page }) => {

  const [arr, setarr] = useState(items.Rating)
  const [s5, sets5] = useState(0)
  const [s4, sets4] = useState(0)
  const [s3, sets3] = useState(0)
  const [s2, sets2] = useState(0)
  const [s1, sets1] = useState(0)

  const stateSetters = [sets1, sets2, sets3, sets4, sets5];
  const states = [s1, s2, s3, s4, s5];

  const Handle_Reset = () => {
    sets1(0);
    sets2(0);
    sets3(0);
    sets4(0);
    sets5(0);
  }
  const Handle_Star1 = () => {
    if (s1 != 1) {
      Handle_Reset()
      sets1(s1 + 1);
    }
  }
  const Handle_Star2 = () => {
    if (s2 != 1) {
      Handle_Reset()
      sets2(s2 + 1);
    }
  }
  const Handle_Star3 = () => {
    if (s3 != 1) {
      Handle_Reset()
      sets3(s3 + 1);
    }
  }
  const Handle_Star4 = () => {
    if (s4 != 1) {
      Handle_Reset()
      sets4(s4 + 1);
    }
  }
  const Handle_Star5 = () => {
    if (s5 != 1) {
      Handle_Reset()
      sets5(s5 + 1);
    }
  }

  const Rating_Update = async () => {
    if (s1 + s2 + s3 + s4 + s5 == 0) {
      alert("Rate Flight")
      return
    }
    let index = 0;
    if (s1 == 1) {
      index = 0;
    } else if (s2 == 1) {
      index = 1;
    } else if (s3 == 1) {
      index = 2;
    } else if (s4 == 1) {
      index = 3;
    } else {
      index = 4
    }
    const postData = { items: items, index: index }
    try {
      const response = await fetch('http://localhost:3001/Update_Rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const responseData = await response.json();
      setarr(responseData[0].Rating)

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error(error);
      console.log('An error occurred. Please try again.');
    }
    Handle_Reset()
    Update_Book_Page()

  }

  return (
    <div className='Rating_Parent'>
      <div className='star star5'><div className='starholder'><img src={star} alt="" /></div><span>{items.Rating[4] + s5}</span>
        <div className="increase_Star" onClick={Handle_Star5}>+</div>
      </div>
      <div className='star star4'><div className='starholder'><img src={star} alt="" /></div><span>{items.Rating[3] + s4}</span>
        <div className="increase_Star" onClick={Handle_Star4}>+</div>
      </div>
      <div className='star star3'><div className='starholder'><img src={star} alt="" /></div><span>{items.Rating[2] + s3}</span>
        <div className="increase_Star" onClick={Handle_Star3}>+</div>
      </div>
      <div className='star star2'><div className='starholder'><img src={star} alt="" /></div><span>{items.Rating[1] + s2}</span>
        <div className="increase_Star" onClick={Handle_Star2}>+</div>
      </div>
      <div className='star star1'><div className='starholder'><img src={star} alt="" /></div><span>{items.Rating[0] + s1}</span>
        <div className="increase_Star" onClick={Handle_Star1}>+</div>
      </div>
      <div className='Rating_Update_Parent'>
        <div className='Rating_Submit' onClick={Rating_Update}>Submit</div>
        <div className='Rating_Reset' onClick={Handle_Reset}>Reset</div>
      </div>
    </div>
  )
}

export default Rating
