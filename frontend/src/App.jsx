import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ProfilePage from './pages/ProfilePage/ProfilePage'; 
import FlightPage from './pages/FlightPage/FlightPage';
import BookPage from './pages/BookPage/BookPage';

const App = () => {

  const LocationWrapper = ({ children }) => {
    const { state } = useLocation();
    const user_info = state ? state.user_info : null;
    return React.cloneElement(children, { user_info });
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile"
            element={
              <LocationWrapper>
                <ProfilePage />
              </LocationWrapper>
            }
          />
          <Route path="/flights" element={<FlightPage />} />
          <Route path="/booknow" element={<BookPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
