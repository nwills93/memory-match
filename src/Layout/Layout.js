import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../common/Header";
import Home from "./Home"
import Play from "./Play";
import TestCard from "./TestCard"
import Scores from "./Scores"


export default function Layout() {

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/test">
          <TestCard />
        </Route>
        <Route path="/scores">
          <Scores />
        </Route>
      </Switch>
    </>
  );
}
