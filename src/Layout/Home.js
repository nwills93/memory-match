import React from "react"
import { useHistory, Link } from "react-router-dom"
import babyBowser from "../images/baby_bowser.png"
import bowser from "../images/bowser.png"
import furyBowser from "../images/fury_bowser.jpg"

export default function Home() {
    
    const history = useHistory()

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card" style={{width: "24rem"}}>
                        <img src={babyBowser} class="card-img-top" alt="baby bowser" style={{height: "24rem"}}/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#bdf9e2"}}>
                                <h5 className="card-title">Easy</h5>
                                <p className="card-text">12 cards. 6 matches. Should be easy, right?</p>
                                <Link to="/play"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>Play</button></Link>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{width: "24rem"}}>
                        <img src={bowser} class="card-img-top" alt="bowser" style={{height: "24rem"}}/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#f2ab1c"}}>
                                <h5 className="card-title">Normal</h5>
                                <p className="card-text">24 cards. 12 matches. Intermediate-level players welcome!</p>
                                <Link to="/play"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>Play</button></Link>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{width: "24rem"}}>
                        <img src={furyBowser} class="card-img-top" alt="fury bowser" style={{height: "24rem"}}/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#f32d54"}}>
                                <h5 className="card-title">Hard</h5>
                                <p className="card-text">36 cards. 18 matches. Oof, good luck.</p>
                                <Link to="/play"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>Play</button></Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}