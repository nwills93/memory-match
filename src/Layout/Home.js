import React from 'react'
import {Route, Switch, Link} from "react-router"
import Header from "../common/Header"
import Play from "./Play"
import CardList from "./CardList"

export default function Home() {
    return (
        <>
            <Header />
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-danger">New Game</button>
            </div>
            <Switch>
                <Route path="/play">
                    <Play />
                </Route>
            </Switch>
        </>
    )
}