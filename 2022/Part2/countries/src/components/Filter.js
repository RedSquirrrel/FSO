const Filter = ({ searchCountry, handleFilter }) => {
  return (
    <div>
      Find Countries: <input type='text' value={searchCountry} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
