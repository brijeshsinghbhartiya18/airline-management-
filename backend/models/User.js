// models/user.js 

const mongoose = require('mongoose');

const PartialFlightInfo = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  Num: { type: String, required: true},
  Departure_City_Code: { type: String, required: true },
  Departure_City_Name: { type: String, required: true },
  Departure_City_Airport: { type: String, required: true },
  Arrival_City_Code: { type: String, required: true },
  Arrival_City_Name: { type: String, required: true },
  Arrival_City_Airport: { type: String, required: true },
  Departure_Date: { type: String, required: true },
  Departure_Time: { type: String, required: true },
  Arrival_Date: { type: String, required: true }, 
  Arrival_Time: { type: String, required: true },
  Price: { type: Number, required: true },
  Seat : {type : String , required : true}
})
 
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  presentbook: [PartialFlightInfo]
});


const User = mongoose.model('User', userSchema);

module.exports = User;
