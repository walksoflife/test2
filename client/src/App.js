import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { makeRequest } from "./makeRequest";

const App = () => {
  const [user, setUser] = useState(null);
  const socket = useRef();
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await makeRequest.get("/users");

      setUser(res.data);
      console.log(res.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    socket.current && socket.current.emit("get-user", user);
  }, [user]);

  return (
    <div>
      <h1>hello page</h1>
      <h2>{user?.name}</h2>
      <p>{user?.age}</p>
    </div>
  );
};

export default App;
