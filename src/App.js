// Hooks imports
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Containers & components imports
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import ComicsId from "./containers/ComicsId";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/comics/:id">
          <ComicsId />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
