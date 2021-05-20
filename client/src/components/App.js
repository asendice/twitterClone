import React from "react";
import Main from "./Main";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app-main-div">
      <BrowserRouter>
        <Route path="/" component={Main} />
      </BrowserRouter>
    </div>
  );
};

export default App;
