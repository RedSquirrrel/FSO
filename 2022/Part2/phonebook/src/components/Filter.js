const Filter = ({ showFiltered, handleFilter }) => {
  return (
    <div className='filter'>
      Filter shown with: <input value={showFiltered} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
