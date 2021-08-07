// Hooks imports
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

// Containers & components imports
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import ComicsId from "./containers/ComicsId";
import Header from "./components/Header";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [value, setValue] = useState("");

  // Function to create a cookie containing the user's token and modify the state to change the Header
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 3,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route path="/comics">
          <Comics value={value} />
        </Route>
        <Route exact path="/comics/:id">
          <ComicsId />
        </Route>
        <Route path="/user/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/user/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/">
          <Home value={value} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
