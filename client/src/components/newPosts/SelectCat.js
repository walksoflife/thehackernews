const SelectCat = ({ category, setCategory }) => {
  return (
    <div className="newp-select">
      <h2 className="newp-select-title">Categories: </h2>
      <select
        name="category"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Data Breaches">Data Breaches</option>
        <option value="Cyber Attacks">Cyber Attacks</option>
        <option value="Vulnerablilities">Vulnerablilities</option>
        <option value="Webinars">Webinars</option>
      </select>
    </div>
  );
};

export default SelectCat;
