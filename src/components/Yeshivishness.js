import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getZivug } from "./Service";
import Sidebar from "./Sidebar";

function Yeshivishness() {
  const { zivug_id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [yeshivishness, setYeshivishness] = useState(0);
  const [phone, setPhone] = useState(0);
  const [kollel, setKollel] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const zivug = await getZivug(zivug_id);
      setData(zivug);
      setLoading(false);
    };
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="row g-5">
        <Sidebar active="Yeshivishness" />
        <div className="col-md-7 col-lg-8">
          <h1>Yeshivishness <small className="text-muted">{yeshivishness}</small></h1>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">
                What kind of phone does {data.name} have?
              </label>
              <select
                className="form-select"
                id="phone"
                required=""
                onChange={(e) => setPhone(+e.target.value)}
              >
                <option>Choose...</option>
                <option value={1}>Unfiltered Smartphone</option>
                <option value={2}>Filtered Smartphone</option>
                <option value={3}>Flip phone</option>
                <option value={4}>No cell phone</option>
              </select>
            </div>
            {data.gender == 'm' && <div className="col-md-6">
              <label htmlFor="kollel" className="form-label">
                How many years does {data.name} plan to learn in kollel after marriage?
              </label>
              <select
                className="form-select"
                id="kollel"
                required=""
                onChange={(e) => setKollel(+e.target.value)}
              >
                <option>Choose...</option>
                <option value={1}>1-2</option>
                <option value={2}>3-5</option>
                <option value={3}>5-10</option>
                <option value={4}>As long as he can</option>
              </select>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Yeshivishness;
