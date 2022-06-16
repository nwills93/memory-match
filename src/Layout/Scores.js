import React, {useEffect, useState} from 'react'
import  {Link} from 'react-router-dom'
import {listAllScores} from "../utils/api"
import "../App.css"

export default function Scores() {
    const [scores, setScores] = useState([])

    useEffect(() => {
        const ac = new AbortController()
        listAllScores(ac.signal).then(setScores).catch((error) => console.log(error))
    }, [])

    const scoreRows = scores.map((score, index) => (
        <tr key={index}>
            <td className="nintendoFont">{score.username}</td>
            <td className="nintendoFont">{score.time_taken}</td>
            <td className="nintendoFont">{score.turns_taken}</td>
            <td className="nintendoFont">{score.difficulty_mode}</td>
        </tr>
    ))

    return (
        <div className="mx-5">
            <div className="d-flex justify-content-center my-2">
                <Link to="/"><button type="button" className="btn btn-secondary">Home</button></Link>
            </div>
            <table className="table table-bordered border-dark table-hover">
                <thead>
                    <tr>
                        <th className="nintendoFont">Player Name</th>
                        <th className="nintendoFont">Time Taken (in seconds)</th>
                        <th className="nintendoFont">Turns Taken</th>
                        <th className="nintendoFont">Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {scoreRows}
                </tbody>
            </table>
        </div>
    )
}