import React from "react"
import { Link } from "react-router-dom"
import babyBowser from "../images/baby_bowser.png"
import bowser from "../images/bowser.png"
import furyBowser from "../images/fury_bowser.jpg"
import powerStar from "../images/power-star.png"

export default function Home() {

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <div className="card" style={{width: "100%"}}>
                        <img src={babyBowser} className="card-img-top" alt="baby bowser" style={{height: "19rem"}}/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#bdf9e2"}}>
                                <h5 className="card-title">Easy</h5>
                                <p className="card-text">12 cards. 6 matches. Should be easy, right?</p>
                                <Link to="/play"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>Play</button></Link>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{width: "100%"}}>
                        <img src={bowser} className="card-img-top" alt="bowser" style={{height: "19rem"}}/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#f2ab1c"}}>
                                <h5 className="card-title">Normal</h5>
                                <p className="card-text text-center">24 cards. 12 matches. Intermediate players welcome!</p>
                                <Link to="/play"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>Play</button></Link>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{width: "100%"}}>
                        <img src={furyBowser} className="card-img-top" alt="fury bowser" style={{height: "19rem"}}/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#f32d54"}}>
                                <h5 className="card-title">Hard</h5>
                                <p className="card-text">36 cards. 18 matches. Oof, good luck.</p>
                                <Link to="/play"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>Play</button></Link>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{width: "100%"}}>
                        <img src={powerStar} className="card-img-top" alt="power star" style={{maxHeight: "19rem"}}/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#31c7fe"}}>
                                <h5 className="card-title">High Scores</h5>
                                <p className="card-text">See how your scores compare to all other gamers!</p>
                                <Link to="/scores"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>View</button></Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}