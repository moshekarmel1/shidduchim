import { timeAgo } from "./Service";
import { deleteReference } from "./Service";

const handleDelete = async (zivug_id, reference_id) => {
  const response = await deleteReference(zivug_id, reference_id);
  location.reload();
};

function ReferencesList(props) {
  return (
    <div>
      <h4 className="mb-3">References</h4>
      <div className="list-group">
        {props.data.map((reference) => (
          <div
            key={reference.reference_id}
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true"
          >
            <i className="rounded-circle fa-solid fa-mobile-retro fa-2xl"></i>
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">{reference.name}</h6>
                <p className="mb-0 opacity-75">
                  <a href={`tel:${reference.phone_number}`}>
                    {reference.phone_number}
                  </a>{" "}
                  | {reference.relationship}
                </p>
              </div>
              <small className="text-nowrap">
                <span className="opacity-50">
                  {timeAgo(new Date(reference.create_date))}
                </span>{" "}
                <br />
                {props.delete && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(reference.zivug_id, reference.reference_id)}
                  >
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                )}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ReferencesList;
