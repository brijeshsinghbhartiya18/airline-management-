// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

 

const {signup} = require('./Controller/authController');
const {add_flight} = require('./Controller/authController');
const {get_Flights} = require('./Controller/authController');
const {get_user_profile} = require('./Controller/authController')
const {book_flight} = require('./Controller/authController')
const {get_Updated_Flight} = require('./Controller/authController')
const {get_comment_update} = require('./Controller/authController')
const {Update_Rating} = require('./Controller/authController')
const {list_all_flight} = require('./Controller/authController')
const {delete_flight} = require('./Controller/authController')
const {cancle_flight} = require('./Controller/authController')
 

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/AX3-Airlines', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/signup' , signup)
app.post('/add_flight' , add_flight) 
app.post('/get_Flights' , get_Flights) 
app.post('/get_user_profile' , get_user_profile) 
app.post('/book_flight' , book_flight)
app.post('/get_Updated_Flight' , get_Updated_Flight)
app.post('/get_comment_update' , get_comment_update)
app.post('/Update_Rating' , Update_Rating)
app.post('/list_all_flight' , list_all_flight)
app.post('/delete_flight' , delete_flight)
app.post('/cancle_flight' , cancle_flight)

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});
