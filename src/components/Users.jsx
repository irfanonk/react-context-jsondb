import { useState, useEffect } from "react";
import Posts from "./Posts";
// import users from "../assets/users.json";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [selectedUser, setSelectedUser] = useState();
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);

  //   console.log("selectedUser:", selectedUser);

  useEffect(() => {
    console.log("useEffect");
    const getUsers = async () => {
      const userResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log("userResponse:", userResponse);
      setUsers(userResponse.data);
    };
    getUsers();
  }, [page]);

  const onUserClick = (user) => {
    // console.log("user", user);
    setSelectedUser(user);
  };

  return (
    <div>
      <h3>Selected User</h3>
      <div>
        <p> {selectedUser?.name} </p>
        <p> {selectedUser?.age} </p>
      </div>
      <h3>Users</h3>
      <div>
        <ul id="list">
          {users?.map((user) => {
            // console.log("user", user.name);
            return (
              <li
                className="user"
                key={user.name}
                // onMouseEnter={() => onMouseEnterUser(user)}
                // onClick={() => onUserClick(user)}
              >
                <Link to={`/user-posts/${user.id}`}>{user.name} </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <p> current page: {page} </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((elm) => {
          return (
            <h2 key={elm} onClick={() => setPage(elm)}>
              {" "}
              {elm}{" "}
            </h2>
          );
        })}
      </div>

      {/* <Posts selectedUser={selectedUser}></Posts> */}
    </div>
  );
}

export default Users;
