import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://randomuser.me/api");
      const apiUser = response.data.results[0];
      setUser(apiUser);
      console.log(apiUser);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRandomUser();
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <div>
            <img
              className="w-20 h-20 rounded-full"
              src={user.picture?.large}
              alt="user"
            />
            <h2>
              {user.name?.first} {user.name?.last}{" "}
            </h2>
            <p>{user?.gender}</p>
          </div>
        )}
        <button onClick={fetchRandomUser}>next user</button>
      </div>
    </>
  );
}

export default App;
