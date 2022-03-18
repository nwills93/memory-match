import React from "react"
import {Route} from "react-router-dom"
import CardList from "./CardList"

export default function Play() {
    return (
        <div>
            <Route path="/play">
                <CardList />
            </Route>
        </div>
    )
}