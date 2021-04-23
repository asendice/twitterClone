import React from "react";
import Landing from "./Landing"
import Main from "./Main"
import { BrowserRouter, Route } from "react-router-dom";
const App = () => {

  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Landing}/>
        <Route path="/main" component={Main}/>
      </BrowserRouter>
    </>
  )

}

export default App;