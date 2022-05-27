import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getZivug,
  getReferencesForZivug,
  getEducationForZivug,
  getFamilyForZivug,
  calcAge,
} from "./Service";
import ReferencesList from "./ReferencesList";
import EducationList from "./EducationList";
import FamilyList from "./FamilyList";

function View() {
  const { zivug_id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [family, setFamily] = useState([]);
  const [education, setEducation] = useState([]);
  const [references, setReferences] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getZivug(zivug_id);
      console.log(data);
      setData(data);
      setFamily(await getFamilyForZivug(zivug_id));
      setEducation(await getEducationForZivug(zivug_id));
      setReferences(await getReferencesForZivug(zivug_id));
      setLoading(false);
    };
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>
        <i
          className={`fa-solid fa-person${data.gender == "m" ? "" : "-dress"}`}
        ></i>
        &nbsp;
        {data.name}&nbsp;
        <small className="text-muted">{calcAge(data.dob)} years old</small>
      </h1>
      <ul>
        <li>
          <b>Height:</b> {Math.floor(data.height / 12)} ft {data.height % 12} in
        </li>
        <li>
          <b>Father:</b> {data.dad}
        </li>
        <li>
          <b>Mother:</b> {data.mom}
        </li>
        <li>
          <b>Shul / Rav:</b> {data.shul}
        </li>
        <li>
          <b>Address:</b> {data.address} {data.city}, {data.state} {data.zip}
        </li>
      </ul>
      <div className="mb-5">
        <a href="#" className="btn btn-primary btn px-4">
          Download Resume
        </a>
      </div>

      <hr className="col-3 col-md-2 mb-5" />

      <div className="row g-5">
        <div className="col-md-4">
          <FamilyList data={family} />
        </div>
        <div className="col-md-4">
          <EducationList data={education} />
        </div>
        <div className="col-md-4">
          <ReferencesList data={references} />
        </div>
      </div>
    </main>
  );
}
export default View;
