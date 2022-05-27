import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  createFamily,
  getFamilyForZivug,
  deleteFamily,
  calcAge,
  timeAgo,
} from "./Service";

function Family() {
  const { zivug_id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [dob, setDOB] = useState(0);
  const [description, setDescription] = useState(0);

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  useEffect(() => {
    const getData = async () => {
      const family = await getFamilyForZivug(zivug_id);
      console.log(family);
      setData(family);
      setLoading(false);
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createFamily({
      zivug_id: zivug_id,
      name: name,
      dob: dob,
      description: description,
    });
    location.reload();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="row g-5">
        <Sidebar active="Family" />
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Family</h4>
          <div className="list-group">
            {data.map((family) => (
              <div
                key={family.family_id}
                className="list-group-item list-group-item-action d-flex gap-3 py-3"
                aria-current="true"
              >
                <i className="rounded-circle fa-solid fa-user fa-2xl"></i>
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 className="mb-0">
                      {family.name} &nbsp;
                      <span className="badge bg-primary rounded-pill">
                        {family.dob ? calcAge(family.dob) : "?"}
                      </span>
                    </h6>
                    <p className="mb-0 opacity-75">{family.description}</p>
                  </div>
                  <small className="text-nowrap">
                    <span className="opacity-50">
                      {timeAgo(new Date(family.create_date))}
                    </span>{" "}
                    <br />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(family.family_id)}
                    >
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  </small>
                </div>
              </div>
            ))}
          </div>
          <br />
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

              <div className="col-sm-12">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required=""
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="invalid-feedback">
                  Valid description is required.
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Add Family
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Family;
