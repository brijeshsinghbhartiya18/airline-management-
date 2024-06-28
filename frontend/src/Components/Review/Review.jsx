import React, { useEffect, useState } from 'react';
import './Review.css'
import EachReview from '../EachReview/EachReview';

const Review = ({ items, user_info , Update_Book_Page}) => {
    const [pov, setPov] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPov({ [name]: value });
    };

    const [past_reviews, setpast_review] = useState(items.Review)
    console.log(past_reviews)
    const Handle_Comment = async (e) => {
        if (pov.length == 0) {
            alert("Write Somthings")
            return;
            }
            let temp;
            e.preventDefault()
        const postData = { items: items , user : user_info.name , words : pov.pov};
        try { 
            const response = await fetch('http://localhost:3001/get_comment_update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
                });
                const responseData = await response.json();
                temp = responseData[0].Review;
        } catch (error) {
            console.log('Error in fetching Flights:', error);
            }
            
        temp.push([user_info.name, pov]);
        setpast_review(temp);
        setPov('')
        Update_Book_Page()
    }

    return (
        <div className='Review_Parent'>
            <div className='Review_Text'><span>REVIEW</span></div>
            <div className='Review_Type'>
                <textarea
                    name="pov"
                    value={pov.pov || ''}
                    placeholder='Comment'
                    onChange={handleChange}
                />
                <div className='TextArea_Button' onClick={Handle_Comment}>
                    SEND
                </div>
            </div>
            <div className='Review_Show'>
                {past_reviews.length === 0 ? (
                    <div className='No_Comment'>No Comments</div>
                ) : (
                    <div className='All_Comment'>
                        {past_reviews.map((rev, index) => (
                            (rev.user) ? <div key={index} className="Each_review"><EachReview user={rev.user} words={rev.words} /></div> : ''
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Review;
