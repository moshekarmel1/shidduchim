import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
            <Link
              className={!zivug_id ? "disabled" : ""}
              to={`/zivug/${zivug_id}`}
            >
              <h6 className="my-0">Basic Info</h6>
            </Link>
            <small className="text-muted">Brief description</small>
          </div>
          <span></span>
        </li>
        <li
          className={`list-group-item d-flex justify-content-between lh-sm ${
            props.active == "Family" ? "active" : ""
          }`}
        >
          <div>
            <Link
              className={!zivug_id ? "disabled" : ""}
              to={`/zivug/${zivug_id}/family`}
            >
              <h6 className="my-0">Family</h6>
            </Link>
            <small className="text-muted">Brief description</small>
          </div>
          <span></span>
        </li>
        <li
          className={`list-group-item d-flex justify-content-between lh-sm ${
            props.active == "Education" ? "active" : ""
          }`}
        >
          <div>
            <Link
              className={!zivug_id ? "disabled" : ""}
              to={`/zivug/${zivug_id}/education`}
            >
              <h6 className="my-0">Education</h6>
            </Link>
            <small className="text-muted">Brief description</small>
          </div>
          <span></span>
        </li>
        <li
          className={`list-group-item d-flex justify-content-between lh-sm ${
            props.active == "Reference" ? "active" : ""
          }`}
        >
          <div>
            <Link
              className={!zivug_id ? "disabled" : ""}
              to={`/zivug/${zivug_id}/references`}
            >
              <h6 className="my-0">References</h6>
            </Link>
            <small className="text-muted">Brief description</small>
          </div>
          <span></span>
        </li>
        <li
          className={`list-group-item d-flex justify-content-between lh-sm ${
            props.active == "Yeshivishness" ? "active" : ""
          }`}
        >
          <div>
            <Link
              className={!zivug_id ? "disabled" : ""}
              to={`/zivug/${zivug_id}/yeshivishness`}
            >
              <h6 className="my-0">Yeshivishness</h6>
            </Link>
            <small className="text-muted">Brief description</small>
          </div>
          <span></span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
