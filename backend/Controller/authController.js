const User = require('../models/User.js');
const Flight = require('../models/Flight.js')
const mongoose = require('mongoose');

 
exports.signup= async (req, res) => {
  const { name, email, password, phone, username } = req.body;

  // Check if a user with the given email, phone, or username already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phone }, { username }] });
  if (existingUser) {
    alert("Account Already Exist")
    return res.status(400).json({ message: 'Account already exists' });
  }
  let present_book = [];


  const newUser = new User({ name:name, email:email, password:password, phone:phone, username:username , presentbook:present_book});
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) { 
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' }); 
  }
};

 
exports.get_user_profile = async (req , res) => {
  const { email , password } = req.body;
  try{
    let check_exist = await User.findOne({email : email , password : password})
  if(check_exist){
    console.log(check_exist)
    res.send(check_exist); 
  }else{
    res.send(false);
  }
}catch(error){
  console.log(error)
}
}


exports.get_Flights = async (req , res) =>{
  try {
    const { from , to , date } = req.body; 

    const flight = await Flight.find({Departure_City_Name:from , Arrival_City_Name:to , Departure_Date : date})
    if (flight) {
      res.status(200).send(flight);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }    
  } catch (error) {
    console.error('Error during fetching fligh_info:', error);
    res.status(500).json({ message: 'Server error' });    
  }
}

exports.get_Updated_Flight = async (req , res)=>{
  try {
    const { items } = req.body; 
    const flight = await Flight.find({ Num : items.Num , Departure_City_Name : items.Departure_City_Name, Arrival_City_Name :items.Arrival_City_Name , 
      Departure_Date : items. Departure_Date ,  Departure_Time : items.Departure_Time , Arrival_Date : items. Arrival_Date , 
      Arrival_Time : items.Arrival_Time })
      
      if (flight) { 
      res.status(200).send(flight);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }    
  } catch (error) {
    console.error('Error during fetching fligh_info:', error);
    res.status(500).json({ message: 'Server error' });    
  }
} 
 
exports.add_flight = async (req , res) => {
  try{
    const {num , departcitycode,departcityname,departcityairport,arrivcitycode,
      arrivcityname,arrivcityairport, depart_date , depart_time , 
      arrive_date , arrive_time , seats_count ,price } = req.body;
       
       
      let seatIndex = ["A", "B" , "C", "D"];
      let seats = [];
  
      for (var i = 0; i < seats_count; i++) {
        seats.push({
          SeatChar: seatIndex[i % 4],
          SeatIndex: Math.floor((i/4)) + 1,
          SeatStatus: 0,
          SeatUser: null
        });
      }
      let rev = []

      let rat = []
      for(var i = 0 ; i < 5 ; i++){
        rat.push(0)
      }

    const existingFlight = await Flight.findOne({ Num : num , Departure_City_Name : departcityname, Arrival_City_Name : arrivcityname , 
     Departure_Date : depart_date ,  Departure_Time : depart_time , Arrival_Date : arrive_date , 
     Arrival_Time : arrive_time });

    if(existingFlight){ 
      return res.status(400).json({ message: 'Flight already exists' });      
    }
    const newFlight = new Flight({ Num : num , Departure_City_Code : departcitycode ,Departure_City_Name : departcityname,Departure_City_Airport : departcityairport
      , Arrival_City_Code : arrivcitycode ,Arrival_City_Name : arrivcityname,Arrival_City_Airport : arrivcityairport, Departure_Date : depart_date , 
      Departure_Time : depart_time , Arrival_Date : arrive_date , Arrival_Time : arrive_time , 
      Seats : seats ,Seats_count: seats_count , Price : price , Review : rev , Rating : rat});
    await newFlight.save();  

  } catch (error) {
    console.error('Error during adding fligh_info:', error);
    res.status(500).json({ message: 'Server error' });     
  }
}
 


exports.book_flight = async (req, res) => {
  try {
    const { user_info, items, selected_seat } = req.body;

    const user = await User.findOne({ email: user_info.email, password: user_info.password });
    const flight = await Flight.findOne({ Num : items.Num , Departure_City_Name : items.Departure_City_Name, Arrival_City_Name : items.Arrival_City_Name , 
      Departure_Date : items.Departure_Date ,  Departure_Time : items.Departure_Time , Arrival_Date : items.Arrival_Date , 
      Arrival_Time : items.Arrival_Time })

    if (!user) {
      return res.status(401).json({ message: 'User Not Found' });
    }
    console.log(items)
    
    user.presentbook.push({
      _id: items._id,
      Num: items.Num,
      Departure_City_Code: items.Departure_City_Code,
      Departure_City_Name: items.Departure_City_Name,
      Departure_City_Airport: items.Departure_City_Airport,
      Arrival_City_Code: items.Arrival_City_Code,
      Arrival_City_Name: items.Arrival_City_Name,
      Arrival_City_Airport: items.Arrival_City_Airport,
      Departure_Date: items.Departure_Date,
      Departure_Time: items.Departure_Time,
      Arrival_Date: items.Arrival_Date,
      Arrival_Time: items.Arrival_Time,
      Price: items.Price,
      Seat: selected_seat
    });
    await user.save();

    for(var i = 0 ; i < items.Seats_count ; i++){
            if(selected_seat == `${items.Seats[i].SeatChar}${items.Seats[i].SeatIndex}`){
        flight.Seats[i].SeatUser = user
        flight.Seats[i].SeatStatus = 1; 
      }
    } 
    await flight.save();

    res.status(200).send(true);

  } catch (error) {
    console.error('Error during booking flight:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.get_comment_update = async (req , res) => {
  try {
    const { items , user , words} = req.body; 
    const flight = await Flight.find({ Num : items.Num , Departure_City_Name : items.Departure_City_Name, Arrival_City_Name :items.Arrival_City_Name , 
      Departure_Date : items. Departure_Date ,  Departure_Time : items.Departure_Time , Arrival_Date : items. Arrival_Date , 
      Arrival_Time : items.Arrival_Time })
      await flight[0].Review.push({
        user : user,
        words : words,
      });
      await flight[0].save()

      if (flight) {
      res.status(200).send(flight);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }    
  } catch (error) {
    console.error('Error during comment updation:', error);
    res.status(500).json({ message: 'Server error' });    
  }
}


exports.Update_Rating = async (req , res) => {
  const {items , index} = req.body
  try{

    const flight = await Flight.find({ Num : items.Num , Departure_City_Name : items.Departure_City_Name, Arrival_City_Name :items.Arrival_City_Name , 
    Departure_Date : items. Departure_Date ,  Departure_Time : items.Departure_Time , Arrival_Date : items. Arrival_Date , 
  Arrival_Time : items.Arrival_Time })

flight[0].Rating[index] = flight[0].Rating[index] + 1;
await flight[0].save();

if (flight) {
  res.status(200).send(flight);
} else {
  res.status(401).json({ message: 'Invalid credentials' });
}   

}catch(error){
  console.error('Error during comment updation:', error);
  res.status(500).json({ message: 'Server error' });  
}

}


exports.list_all_flight = async (req , res)=>{
  try{
    const flight = await Flight.find()

if(flight){
  res.status(200).send(flight)
}else{
  res.status(401).json({message : 'Invalid'})
}

  }catch(error){
    console.error('Error during comment updation:', error);
    res.status(500).json({ message: 'Server error' });     
  }
}

exports.delete_flight = async (req, res) => {
  try {
    const { items } = req.body;
    const flight = await Flight.findOne({
      Num: items.Num,
      Departure_City_Name: items.Departure_City_Name,
      Arrival_City_Name: items.Arrival_City_Name,
      Departure_Date: items.Departure_Date,
      Departure_Time: items.Departure_Time,
      Arrival_Date: items.Arrival_Date,
      Arrival_Time: items.Arrival_Time
    });

    if (!flight) {
      return res.status(401).json({ message: 'Flight Not Found' });
    }

    let seats = flight.Seats;
    for (let i = 0; i < flight.Seats_count; i++) {
      if (seats[i].SeatStatus == 1) {
        const userId = seats[i].SeatUser;
        console.log(userId)
        const user = await User.findById(userId);
        if (user) {
          // console.log("BEFOR" , user.presentbook);
          user.presentbook = user.presentbook.filter(flightInfo => {
            return !flightInfo._id.equals(flight._id);
          });
          // console.log("AFTER" , user.presentbook)
          await user.save();
        } else {
          console.log(`User with id ${userId} not found`);
        }
      }
    }
    await Flight.deleteOne({ _id: flight._id });

    res.status(200).json({ message: 'Flight and references deleted successfully' });
  } catch (error) {
    console.error('Error during flight deletion:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancle_flight = async (req , res)=>{
  const {items , user_info} = req.body;

  try{ 
    const user = await User.findOne({email : user_info.email , password : user_info.password})
    user.presentbook = user.presentbook.filter((flightinfo => {
      return !flightinfo._id.equals(items._id)
    }))
    
    await user.save()

    const flight = await Flight.findOne({
      Num: items.Num,
      Departure_City_Name: items.Departure_City_Name,
      Arrival_City_Name: items.Arrival_City_Name,
      Departure_Date: items.Departure_Date,
      Departure_Time: items.Departure_Time,
      Arrival_Date: items.Arrival_Date,
      Arrival_Time: items.Arrival_Time
    });

    let seats = flight.Seats;
    for (let i = 0; i < flight.Seats_count; i++) {
      if (seats[i].SeatStatus == 1) {
        const userId = seats[i].SeatUser; 
        const user = await User.findById(userId);
        console.log(user && user.email == user_info.email)
        if (user && user.email == user_info.email) {
          flight.Seats[i].SeatStatus = 0;
          flight.Seats[i].SeatUser = null;
          await flight.save();
        }
      }
    }


  }catch(error){
    console.error('Error during flight deletion:', error);
    res.status(500).json({ message: 'Server error' });    
  }

}