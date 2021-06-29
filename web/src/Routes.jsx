import { Switch, Redirect, Route } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import { Context } from "./data/Context";
import Mail from "./pages/Mail";
import axios from "axios";
import { API } from "./data/API";
import ProjectEdit from "./pages/ProjectEdit";

const Routes = () => {
  const { isLoggedIn, setUser, user, setIsLoggedIn, isLoading, setIsLoading } =
    useContext(Context);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData") || "[]");
    if (data && data.accessToken && data.user) {
      axios
        .post(
          API + `/user/refresh/${data.refreshToken}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${data.accessToken}`,
            },
          }
        )
        .then((response) => {
          setIsLoggedIn(true);
          setUser(response.data.user);
          localStorage.setItem("userData", JSON.stringify(response.data));
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUser(false);
        });
    } else {
      setIsLoggedIn(false);
      setUser(false);
    }
    setIsLoading(false);
  }, [setIsLoggedIn, setUser, setIsLoading]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (!isLoggedIn && !user) {
    return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route
        path="/dashboard"
        exact
        render={() => (
          <Home>
            <Dashboard />
          </Home>
        )}
      />
      <Route
        path="/project"
        exact
        render={() => (
          <Home>
            <Project />
          </Home>
        )}
      />
      <Route
        path="/project/edit"
        exact
        render={() => (
          <Home>
            <ProjectEdit />
          </Home>
        )}
      />
      <Route
        path="/project/mail/:id"
        exact
        render={() => (
          <Home>
            <Mail />
          </Home>
        )}
      />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default Routes;
