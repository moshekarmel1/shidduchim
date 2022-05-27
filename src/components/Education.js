import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import EducationList from "./EducationList";
import {
  createEducation,
  getEducationForZivug,
} from "./Service";

function Education() {
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
      const education = await getEducationForZivug(zivug_id);
      console.log(education);
      setData(education);
      setLoading(false);
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createEducation({
      zivug_id: zivug_id,
      name: name,
      from_year: +from_year,
      to_year: +to_year,
    });
    location.reload();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="row g-5">
        <Sidebar active="Education" />
        <div className="col-md-7 col-lg-8">
          <EducationList data={data} delete={true} />
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
              Add Education
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Education;
