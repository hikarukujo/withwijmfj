import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const latitude = 35.220711;
const longitude = -80.944420;

const App = () => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`);
        const data = response.data;
        if (data.results && data.results.length > 0) {
          const locationDetails = data.results[0].components;
          setLocation({
            city: locationDetails.city,
            state: locationDetails.state,
            country: locationDetails.country
          });
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {location.city}, {location.state}
            <br />
            {location.country}
          </h2>
        </div>
      </header>
    </div>
  );
};

export default App;