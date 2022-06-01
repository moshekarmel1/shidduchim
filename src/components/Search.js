import { useState } from "react";
import {
  convertInchesToFeet,
  getRemainingInches,
  searchForZivug,
} from "./Service";
import Grid from "./Grid";

function Search() {
  const [gender, setGender] = useState("m");
  const [zip, setZip] = useState("00001");
  const [height, setHeight] = useState(48);
  const [data, setData] = useState([]);
  const [age, setAge] = useState(18);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await searchForZivug(gender, zip, height, age);
    console.log(results);
    setData(results);
  };

  return (
    <main>
      <div className="py-5 text-center">
        <h2>Search</h2>
        <p className="lead">
          Find your perfect match by entering your information below.
        </p>
      </div>

      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-first">

          <form className="card p-2" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
                type="text"
                className="form-select"
                placeholder="Promo code"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value={"m"}>Male</option>
                <option value={"f"}>Female</option>
              </select>
            </div>
            <br />
            <div>
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <select
                id="location"
                type="text"
                className="form-select"
                placeholder="Promo code"
                onChange={(e) => setZip(e.target.value)}
              >
                <option value={"11111"}>In-Town</option>
                <option value={"22222"}>Out-of-Town</option>
              </select>
            </div>
            <br />
            <div>
              <label htmlFor="height" className="form-label">
                Taller than
              </label>
              <input
                type="range"
                className="form-range"
                min="48"
                max="80"
                step="1"
                id="height"
                onChange={(e) => setHeight(e.target.value)}
              />
              <output>
                {`${convertInchesToFeet(height)} ft ${getRemainingInches(
                  height
                )} in`}
              </output>
            </div>
            <br />
            <div>
              <label htmlFor="age" className="form-label">
                Older than
              </label>
              <input
                type="range"
                className="form-range"
                min="18"
                max="50"
                step="1"
                id="age"
                defaultValue={18}
                onChange={(e) => setAge(e.target.value)}
              />
              <output>
                {`${age} years old`}
              </output>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
        <div className="col-md-7 col-lg-8">
            <Grid data={data} />
        </div>
      </div>
    </main>
  );
}
export default Search;
