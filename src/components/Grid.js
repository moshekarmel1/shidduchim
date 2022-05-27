import { calcAge } from "./Service";

function Grid(props) {
  return (
    <div>
      {props.data.map((row) => (
        <div key={row.zivug_id} className="card col-4" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">
              <i className="fa fa-solid fa-person fa-xl" /> &nbsp;
              {row.name}
            </h5>
            <p className="card-text">
              {calcAge(row.dob)} years old, {Math.floor(row.height / 12)} ft {row.height % 12} in <br />
              {row.city}, {row.state}
            </p>
            <a href={`/view/${row.zivug_id}`} className="btn btn-primary">
              View &raquo;
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Grid;
