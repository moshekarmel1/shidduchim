import { timeAgo, deleteFamily, calcAge } from "./Service";

const handleDelete = async (zivug_id, family_id) => {
  const response = await deleteFamily(zivug_id, family_id);
  location.reload();
};

function FamilyList(props) {
  return (
    <div>
      <h4 className="mb-3">Family</h4>
      <div className="list-group">
        {props.data.map((family) => (
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
                {props.delete && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(family.zivug_id, family.family_id)
                    }
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

export default FamilyList;
