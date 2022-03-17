import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../common/Header";
import Home from "./Home"
import Play from "./Play";
import TestCard from "./TestCard"
import TestModal from "./Modals/MatchModal"


export default function Layout() {
  const history = useHistory();
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
        <Route path="/testmodal">
          <TestModal />
        </Route>
      </Switch>
    </>
  );
}
