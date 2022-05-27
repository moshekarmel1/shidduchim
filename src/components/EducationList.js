import { deleteEducation, timeAgo } from "./Service";

const handleDelete = async (zivug_id, reference_id) => {
  const response = await deleteEducation(zivug_id, reference_id);
  location.reload();
};

function EducationList(props) {
  return (
    <div>
      <h4 className="mb-3">Education</h4>
      <div className="list-group">
        {props.data.map((education) => (
          <div
            key={education.education_id}
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true"
          >
            <i className="rounded-circle fa-solid fa-school fa-2xl"></i>
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">{education.name}</h6>
                <p className="mb-0 opacity-75">
                  {education.from_year} - {education.to_year}
                </p>
              </div>
              <small className="text-nowrap">
                <span className="opacity-50">
                  {timeAgo(new Date(education.create_date))}
                </span>{" "}
                <br />
                {props.delete && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(education.zivug_id, education.education_id)}
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
export default EducationList;
