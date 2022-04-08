import { useEffect, useState } from 'react';
import axios from 'axios';

import Country from './components/Country';
import Weather from './components/Weather';
import Filter from './components/Filter';
import RenderedCountry from './components/RenderCountry';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [showResultCountry, setShowResultCountry] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (selected) {
      axios
        .get('http://api.weatherstack.com/current', {
          params: {
            access_key: process.env.REACT_APP_API_KEY,
            query: selected,
          },
        })
        .then(response => {
          displayWeather(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selected]);

  const filteredCountry = countries.filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase()));

  const handleFilter = e => {
    setSearchCountry(e.target.value);
    setShowResultCountry(null);
    setWeather(null);
  };

  const displayCountry = country => {
    setSelected(country.name.common.toLowerCase());

    const countryData = (
      <div>
        <Country country={country} />
      </div>
    );
    setShowResultCountry(countryData);
  };

  const displayWeather = weather => {
    const weatherData = (
      <div>
        <Weather weather={weather} />
      </div>
    );
    setWeather(weatherData);
  };

  return (
    <div>
      <Filter searchCountry={searchCountry} handleFilter={handleFilter} />
      {!showResultCountry && filteredCountry.length !== countries.length && (
        <RenderedCountry filteredCountry={filteredCountry} displayCountry={displayCountry} />
      )}
      {showResultCountry}
      {weather}
    </div>
  );
};

export default App;

