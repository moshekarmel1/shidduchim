import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getZivug, calcAge } from "./Service";

function Sidebar(props) {
  const { zivug_id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const zivug = await getZivug(zivug_id);
      setData(zivug);
      setLoading(false);
    };
    if (zivug_id) {
      getData();
    } else {
      setLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-md-5 col-lg-4 order-md-last">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary">{data.name || "New Zivug"}</span>
        <span className="badge bg-primary rounded-pill">
          {data.dob ? calcAge(data.dob) : "?"}
        </span>
      </h4>
      <ul className="list-group mb-3">
        <li
          className={`list-group-item d-flex justify-content-between lh-sm ${
            props.active == "Basic" ? "active" : ""
          }`}
        >
          <div>
            <a
              className={!zivug_id ? "disabled" : ""}
              href={`/zivug/${zivug_id}`}
            >
              <h6 className="my-0">Basic Info</h6>
            </a>
            <small className="text-muted">Brief description</small>
          </div>
          <span>$12</span>
        </li>
        <li
          className={`list-group-item d-flex justify-content-between lh-sm ${
            props.active == "Family" ? "active" : ""
          }`}
        >
          <div>
            <a
              className={!zivug_id ? "disabled" : ""}
              href={`/zivug/${zivug_id}/family`}
            >
              <h6 className="my-0">Family</h6>
            </a>
            <small className="text-muted">Brief description</small>
          </div>
          <span>$5</span>
        </li>
        <li
          className={`list-group-item d-flex justify-content-between lh-sm ${
            props.active == "Education" ? "active" : ""
          }`}
        >
          <div>
            <a
              className={!zivug_id ? "disabled" : ""}
              href={`/zivug/${zivug_id}/education`}
            >
              <h6 className="my-0">Education</h6>
            </a>
            <small className="text-muted">Brief description</small>
          </div>
          <span>$8</span>
        </li>
        <li
          className={`list-group-item d-flex justify-content-between lh-sm ${
            props.active == "Reference" ? "active" : ""
          }`}
        >
          <div>
            <a
              className={!zivug_id ? "disabled" : ""}
              href={`/zivug/${zivug_id}/references`}
            >
              <h6 className="my-0">References</h6>
            </a>
            <small className="text-muted">Brief description</small>
          </div>
          <span>$5</span>
        </li>
        <li className="list-group-item d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">Promo code</h6>
            <small className="text-muted">EXAMPLECODE</small>
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
  );
}

export default Sidebar;
