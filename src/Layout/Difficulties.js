import React from "react"
import { Route, Switch } from "react-router-dom"
import Easy from './GameModes/Easy';
import Medium from './GameModes/Medium';
import Hard from './GameModes/Hard';

export default function Difficulties() {
    return (
        <div>
            <Switch>
                <Route exact path="/difficulties/easy">
                    <Easy />
                </Route>
                <Route exact path="/difficulties/medium">
                    <Medium />
                </Route>
                <Route exact path="/difficulties/hard">
                    <Hard />
                </Route>
            </Switch>
        </div>
    )
}