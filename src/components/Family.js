import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  createFamily,
  getFamilyForZivug,
  deleteFamily,
  timeAgo,
} from "./Service";

function Family() {
  const { zivug_id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [from_year, setFromYear] = useState(0);
  const [to_year, setToYear] = useState(0);

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
      from_year: +from_year,
      to_year: +to_year,
    });
    location.reload();
  };

  const handleDelete = async (family_id) => {
    const response = await deleteFamily(zivug_id, family_id);
    console.log(response);
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
                <i className="rounded-circle fa-solid fa-school fa-2xl"></i>
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 className="mb-0">{family.name}</h6>
                    <p className="mb-0 opacity-75">
                        {family.from_year} - {family.to_year}
                    </p>
                  </div>
                  <small className="text-nowrap">
                    <span className="opacity-50">
                      {timeAgo(new Date(family.create_date))}
                    </span>{" "}
                    <br />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(family.reference_id)}
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

              <div className="col-sm-3">
                <label htmlFor="from" className="form-label">
                  From Year
                </label>
                <select
                  className="form-select"
                  id="from"
                  required=""
                  onChange={(e) => setFromYear(e.target.value)}
                >
                  <option>Choose...</option>
                  {range(
                    new Date().getFullYear(),
                    new Date().getFullYear() - 30,
                    -1
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Valid From Year is required.</div>
              </div>

              <div className="col-sm-3">
                <label htmlFor="to" className="form-label">
                  To Year
                </label>
                <select
                  className="form-select"
                  id="to"
                  required=""
                  onChange={(e) => setToYear(e.target.value)}
                >
                  <option>Choose...</option>
                  {range(
                    new Date().getFullYear(),
                    new Date().getFullYear() - 30,
                    -1
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Valid To Year is required.</div>
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
