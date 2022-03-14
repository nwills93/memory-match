import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../common/Header";
import Play from "./Play";
import TestCard from "./TestCard"
import TestModal from "./Modals/MatchModal"


export default function Home() {
  const history = useHistory();
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => history.push("/play")}
            >
              New Game
            </button>
          </div>
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
