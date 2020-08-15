import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "../src/components/index.component";
import ViewFilm from "../src/components/viewFilm.component";
function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/Movie/:id" exact component={ViewFilm} />
    </Router>
  );
}
export default App;
