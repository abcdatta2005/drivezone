import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL)
      .then(res => setMsg(res.data))
      .catch(err => {
        console.error(err);
        setMsg("Backend not reachable");
      });
  }, []);

  return (
    <div>
      <h1>DriveZone</h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;
