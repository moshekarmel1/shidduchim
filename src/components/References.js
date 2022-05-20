import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { createReference, getReferencesForZivug, deleteReference, timeAgo } from "./Service";

function References() {
  const { zivug_id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [relationship, setRelationship] = useState();

  useEffect(() => {
    const getData = async () => {
      const references = await getReferencesForZivug(zivug_id);
      console.log(references);
      setData(references);
      setLoading(false);
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createReference({
      zivug_id: zivug_id,
      name: name,
      phone: phone,
      relationship: relationship,
    });
    location.reload();
  };

  const handleDelete = async (reference_id) => {
    const response = await deleteReference(zivug_id, reference_id);
    console.log(response);
    location.reload();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="row g-5">
        <Sidebar active="Reference" />
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">References</h4>
          <div className="list-group">
            {data.map((reference) => (
              <div key={reference.reference_id}
                className="list-group-item list-group-item-action d-flex gap-3 py-3"
                aria-current="true"
              >
                <i
                  className="rounded-circle fa-solid fa-user fa-2xl"
                ></i>
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 className="mb-0">{reference.name}</h6>
                    <p className="mb-0 opacity-75">
                      <a href={`tel:${reference.phone_number}`}>{reference.phone_number}</a> | {reference.relationship}
                    </p>
                  </div>
                  <small className="text-nowrap">
                    <span className="opacity-50">{timeAgo(new Date(reference.create_date))}</span> <br />
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(reference.reference_id)}>
                        <i className="fa-solid fa-trash"></i> Delete</button>
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

              <div className="col-sm-3">
                <label htmlFor="feet" className="form-label">
                  Relationship
                </label>
                <select
                  className="form-select"
                  id="feet"
                  required=""
                  onChange={(e) => setRelationship(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>Friend</option>
                  <option>Neighbor</option>
                  <option>Rav</option>
                  <option>Mechutan</option>
                </select>
                <div className="invalid-feedback">Valid feet is required.</div>
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Add Reference
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default References;
