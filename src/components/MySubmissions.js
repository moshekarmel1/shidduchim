import { useEffect, useState } from "react";
import { getMySubmissions, timeAgo } from "./Service";

function MySubmissions() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const submissions = await getMySubmissions();
      setData(submissions);
      setLoading(false);
    };
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div></div>;
  }

  return (
    <div className="my-3 p-3 bg-body rounded shadow-sm">
      <h6 className="border-bottom pb-2 mb-0">Submitted by you</h6>
      {data.map((submission) => (
        <div key={submission.zivug_id} className="media text-muted pt-3">
          <p className="pb-3 mb-0 lh-sm border-bottom">
            <a href={`/zivug/${submission.zivug_id}`} className="d-block text-gray-dark">
                <i className={`fa-solid fa-person${submission.gender == 'f' ? '-dress' : ''} fa-xl`}></i>&nbsp; 
                {submission.name}
            </a>
            Created {timeAgo(new Date(submission.create_date))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MySubmissions;
