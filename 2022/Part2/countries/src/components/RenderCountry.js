const RenderedCountry = ({ filteredCountry, displayCountry }) => {
  if (filteredCountry.length <= 10 && filteredCountry.length > 1) {
    return filteredCountry.map(c => {
      return (
        <p key={c.name.common}>
          {c.name.common}
          <span>
            <button style={{ cursor: 'pointer' }} onClick={() => displayCountry(c)}>
              Show
            </button>
          </span>
        </p>
      );
    });
  } else if (filteredCountry.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountry.length === 1) {
    setTimeout(() => {
      return filteredCountry.map(c => {
        return (
          <div key={c.name.common}>
            <div>{displayCountry(c)}</div>
          </div>
        );
      });
    }, 0);
  }
};

export default RenderedCountry;
