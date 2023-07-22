import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get('https://api.life360.com/v3/circles/e54367f0-24b6-4cc3-94da-29d998174daa/members/8f1d8944-bb77-48c6-91f5-c0a181f31b3b', {
          headers: { Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}` }
        });

        const { latitude, longitude } = response.data.location;
        return { latitude, longitude };
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error(`Error: ${error}`);
      }
    };

    const fetchLocationDetails = async (lat, lon) => {
      try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`);
        const data = response.data;
        if (data.results && data.results.length > 0) {
          const locationDetails = data.results[0].components;
          setLocation({
            city: locationDetails.city,
            state: locationDetails.state,
            country: locationDetails.country
          });
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error(`Error: ${error}`);
      }
    };

    fetchLocationData()
      .then(({ latitude, longitude }) => fetchLocationDetails(latitude, longitude));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : error ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <div>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {location.city}, {location.state}
              <br />
              {location.country}
            </h2>
          </div>
        )}
      </header>
      <footer style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', padding: '10px', background: '#282c34', color: '#fff' }}>
        &copy; 2023, JMFJ - <a href="https://github.com/hikarukujo/witwijmfj" target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb' }}>GitHub Source</a>
      </footer>
    </div>
  );
};

export default App;