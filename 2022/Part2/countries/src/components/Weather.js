const Weather = ({ weather }) => {
  return (
    <div>
      <h1>Weather in {weather.location.name} </h1>
      <p>Temperature {weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} alt='' />
      <p>Wind: {weather.current.wind_speed} m/s </p>
    </div>
  );
};

export default Weather;
