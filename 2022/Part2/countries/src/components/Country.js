const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital} </p>
      <p>Area: {country.area} </p>
      <div>
        <p>Languages:</p>
        <ul>
          {country.languages &&
            Object.entries(country.languages).map(([k, v]) => {
              return <li key={v}>{v}</li>;
            })}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.name.common} width='150' />
    </div>
  );
};

export default Country;
