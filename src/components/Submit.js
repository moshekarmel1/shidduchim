import { useState } from "react";
import { createZivug } from "./Service";

function Submit() {
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [dob, setDOB] = useState();
  const [height, setHeight] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createZivug({
      name: name,
      gender: gender,
      dob: dob,
      height: height,
      address: address,
      state: state,
      zip: zip,
      phone: phone
    });
    console.log(response);
  };

  return (
    <div>
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Basic Info</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$12</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Education</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$8</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">References</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$5</span>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">−$5</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$20</strong>
            </li>
          </ul>

          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
              />
              <button type="submit" className="btn btn-secondary">
                Redeem
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Basic Info</h4>
          <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
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
                <div className="invalid-feedback">
                  Valid name is required.
                </div>
              </div>

              <div className="col-sm-6">
              <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select className="form-select" id="gender" required="" onChange={(e) => setGender(e.target.value)}>
                  <option>Choose...</option>
                  <option value={'m'}>Male</option>
                  <option value={'f'}>Female</option>
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
                  type="text"
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

              <div className="col-sm-6">
                <label htmlFor="height" className="form-label">
                  Height
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="height"
                  placeholder=""
                  required=""
                  onChange={(e) => setHeight(e.target.value)}
                />
                <div className="invalid-feedback">Valid height is required.</div>
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
                <select className="form-select" id="state" required="" onChange={(e) => setState(e.target.value)}>
                  <option>Choose...</option>
                  <option>California</option>
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
                  onChange={(e) => setZip(e.target.value)}
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
                    onChange={(e) => setPhone(e.target.value)}
                  />
                <div className="invalid-feedback">
                  Please select a valid phone.
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
