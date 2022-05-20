import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getZivug, updateZivug, convertInchesToFeet, getRemainingInches } from "./Service";
import Sidebar from "./Sidebar";

function Zivug() {
  const { zivug_id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [feet, setFeet] = useState();
  const [inches, setInches] = useState();
  useEffect(() => {
    const getData = async () => {
      const zivug = await getZivug(zivug_id);
      setData(zivug);
      setFeet(convertInchesToFeet(zivug.height));
      setInches(getRemainingInches(zivug.height));
      setLoading(false);
    };
    getData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    data.height = (+feet * 12) + +inches;
    const response = await updateZivug(data);
    console.log(response);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data.zivug_id) {
    return <div></div>;
  }

  return (
    <div>
      <div className="row g-5">
        <Sidebar />
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Basic Info</h4>
          <form
            className="needs-validation"
            noValidate=""
            onSubmit={handleUpdate}
          >
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder=""
                  required=""
                  value={data.name}
                  onChange={(e) => (data.name = e.target.value)}
                />
                <div className="invalid-feedback">Valid name is required.</div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="gender"
                  required=""
                  value={data.gender}
                  onChange={(e) => (data.gender = e.target.value)}
                >
                  <option>Choose...</option>
                  <option value={"m"}>Male</option>
                  <option value={"f"}>Female</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid gender.
                </div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="dob" className="form-label">
                  DOB
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  placeholder=""
                  required=""
                  value={data.dob.split('T')[0]}
                  onChange={(e) => (data.dob = e.target.value)}
                />
                <div className="invalid-feedback">
                  Valid Date Of Birth is required.
                </div>
              </div>

              <div className="col-sm-3">
                <label htmlFor="feet" className="form-label">
                  Height - Feet
                </label>
                <select
                  className="form-select"
                  id="feet"
                  required=""
                  value={convertInchesToFeet(data.height)}
                  onChange={(e) => setFeet(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                </select>
                <div className="invalid-feedback">
                  Valid feet is required.
                </div>
              </div>

              <div className="col-sm-3">
                <label htmlFor="inches" className="form-label">
                  Height - Inches
                </label>
                <select
                  className="form-select"
                  id="inches"
                  required=""
                  value={getRemainingInches(data.height)}
                  onChange={(e) => setInches(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                </select>
                <div className="invalid-feedback">
                  Valid inches is required.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required=""
                  value={data.address}
                  onChange={(e) => (data.address = e.target.value)}
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <select
                  className="form-select"
                  id="state"
                  required=""
                  value={data.state}
                  onChange={(e) => (data.state = e.target.value)}
                >
                  <option>Choose...</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required=""
                  value={data.zip}
                  onChange={(e) => (data.zip = e.target.value)}
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>

              <div className="col-md-5">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder=""
                  required=""
                  value={data.phone}
                  onChange={(e) => (data.phone = e.target.value)}
                />
                <div className="invalid-feedback">
                  Please select a valid phone.
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Zivug;
