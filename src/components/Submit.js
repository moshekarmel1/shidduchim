import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createZivug } from "./Service";
import Sidebar from "./Sidebar";

function Submit() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [dob, setDOB] = useState();
  const [feet, setFeet] = useState();
  const [inches, setInches] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();
  const [dad, setDad] = useState();
  const [mom, setMom] = useState();
  const [shul, setShul] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createZivug({
      name: name,
      gender: gender,
      dob: dob,
      height: +feet * 12 + +inches,
      address: address,
      state: state,
      zip: zip,
      phone: phone,
      dad: dad,
      mom: mom,
      shul: shul,
    });
    console.log(response);
    navigate(`/zivug/${response.zivug_id}`);
  };

  return (
    <div>
      <div className="row g-5">
        <Sidebar active="Basic" />
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Basic Info</h4>
          <form
            className="needs-validation"
            noValidate=""
            onSubmit={handleSubmit}
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setGender(e.target.value)}
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
                  onChange={(e) => setDOB(e.target.value)}
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
                  onChange={(e) => setFeet(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                </select>
                <div className="invalid-feedback">Valid feet is required.</div>
              </div>

              <div className="col-sm-3">
                <label htmlFor="inches" className="form-label">
                  Height - Inches
                </label>
                <select
                  className="form-select"
                  id="inches"
                  required=""
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
                  onChange={(e) => setAddress(e.target.value)}
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
                  onChange={(e) => setState(e.target.value)}
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

              <div className="col-md-4">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required=""
                  onChange={(e) => setZip(e.target.value)}
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>

              <div className="col-md-4">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder=""
                  required=""
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="invalid-feedback">
                  Please select a valid phone.
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="father" className="form-label">
                  Father's Name / Occupation
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="father"
                  placeholder=""
                  required=""
                  onChange={(e) => setDad(e.target.value)}
                />
                <div className="invalid-feedback">
                  Please select a valid Fathers info.
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="mother" className="form-label">
                  Mother's Name / Occupation
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mother"
                  placeholder=""
                  required=""
                  onChange={(e) => setMom(e.target.value)}
                />
                <div className="invalid-feedback">
                  Please select a valid Mothers info.
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="shul" className="form-label">
                  Shul / Rav
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shul"
                  placeholder=""
                  required=""
                  onChange={(e) => setShul(e.target.value)}
                />
                <div className="invalid-feedback">
                  Please select a valid Shul info.
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Submit;
