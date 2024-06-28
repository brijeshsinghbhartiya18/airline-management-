import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Component/Sidebar/Sidebar';
import AddFlightPage from './Pages/AddFlightPage/AddFlightPage';
import ListFlight from './Pages/ListFlight/ListFlight';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/add-flight" element={<AddFlightPage />} />
            <Route path="/list-flights" element={<ListFlight />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App; 