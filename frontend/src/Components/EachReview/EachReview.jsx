import React from 'react'
import './EachReview.css'
const EachReview = ({user , words}) => {
    console.log(user , words)
    return (
    <div className='EachReview_Parent'>
        
        <div className='EachReview_user'><span>{user} &nbsp; : </span></div>
        <div className='EachReview_words'><p>{words}</p></div> 
 
    </div>
  )
}

export default EachReview
