import React from "react"
import {Route} from "react-router-dom"
import Layout from "./Layout/Layout"

function App() {
  return (
    <div className="App">
      <Route path="/">
        <Layout />
      </Route>
    </div>
  );
}

export default App;
