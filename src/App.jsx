import { useEffect, useState } from "react";
import UserProfile from "./components/UserProfile";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchRandomUser = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      const apiUser = response.data.results[0];
      setUsers([...users, apiUser]);
      console.log(users);
      console.log(currentIndex);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchRandomUser();
    console.log(users);
  }, []);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePreviousClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + users.length) % users.length
    );
  };

  return (
    <div>
      {users.length > 0 && (
        <div>
          <div>
            <UserProfile user={users[currentIndex]} />
          </div>
          <div>
            <button onClick={handlePreviousClick}>prev user</button>
            <button onClick={()=>{
              fetchRandomUser();
              handleNextClick();
            }}>next user</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
