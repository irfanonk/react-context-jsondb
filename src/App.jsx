import Home from "./pages/Home";
import Todo from "./pages/Todo";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import UserPosts from "./pages/UserPosts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext, useState } from "react";
import { UserContext } from "./context/UserDataContext";

function App() {
  const userDataCtx = useContext(UserContext);
  // console.log("userDataCtx:", userDataCtx);
  const { setUserData, appLoading } = userDataCtx;

  const activeUser = !!userDataCtx?.userData;
  console.log("App  activeUser:", activeUser);

  const onLogout = () => {
    localStorage.removeItem("activeUser");
    setUserData(null);
  };

  if (appLoading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 30,
            }}
          >
            <li>
              {" "}
              <Link to="/"> Home </Link>
            </li>
            {activeUser ? (
              <>
                <li>
                  <Link to="/todo"> My Todos </Link>
                </li>
                <li>
                  <Link onClick={onLogout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register"> Register </Link>
                </li>
                <li>
                  <Link to="/login"> Login </Link>
                </li>
              </>
            )}
          </ul>
          <div>
            {activeUser ? "Active User : " + userDataCtx?.userData?.name : ""}
          </div>
        </header>
        <Routes>
          <Route path="/" Component={Home} />
          <Route
            path="register"
            element={
              activeUser ? <Navigate to="/todo" replace={true} /> : <Register />
            }
          />
          <Route
            path="login"
            element={
              activeUser ? <Navigate to="/todo" replace={true} /> : <Login />
            }
          />
          <Route path="todo" Component={Todo} />
          <Route path="user-posts/:userId" Component={UserPosts} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
