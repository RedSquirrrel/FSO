const Filter = ({ showFiltered, handleFilter }) => {
  return (
    <div>
      Filter shown with: <input value={showFiltered} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
