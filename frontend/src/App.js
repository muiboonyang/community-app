import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search/:type" exact component={SearchResults} />
          <Route path="/register" exact component={CreateAccount} />
          <Route path="/search/:type/:id" exact component={TaskDetails} />
          <Route path="/login" exact component={Login} />
          <Route path="/:username/reviews" exact component={Reviews} />

          {loggedIn ? (
            <Switch>
              <Route path="/profile" exact component={Profile} />
              <Route path="/createrequest" exact component={CreateRequest} />
              <Route path="/mytasks" exact component={MyTasks} />
            </Switch>
          ) : null}
        </Switch>
      </BrowserRouter>
    </LoginContext.Provider>
  );
};

export default App;
