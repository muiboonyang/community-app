import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginContext from "./context/login-context";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import CreateRequest from "./pages/CreateRequest";
import SearchResults from "./pages/SearchResults";
import TaskDetails from "./components/TaskDetails";
import MyTasks from "./pages/MyTasks";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import PrivateRoute from "./pages/PrivateRoute";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState("");

  const handleLogin = async () => {
    const res = await fetch(
      `/sessions`
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <LoginContext.Provider
      value={{
        profileName,
        setProfileName,
        loggedIn,
        setLoggedIn,
        handleLogin,
      }}
    >
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:type" element={<SearchResults />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/search/:type/:id" element={<TaskDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:username/reviews" element={<Reviews />} />

          <React.Fragment>
            <Route
              path="/profile"
              element={
                <PrivateRoute isLoggedIn={loggedIn}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/createrequest"
              element={
                <PrivateRoute isLoggedIn={loggedIn}>
                  <CreateRequest />
                </PrivateRoute>
              }
            />
            <Route
              path="/mytasks"
              element={
                <PrivateRoute isLoggedIn={loggedIn}>
                  <MyTasks />
                </PrivateRoute>
              }
            />
          </React.Fragment>
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
};

export default App;
