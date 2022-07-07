import React from "react"
//import "./Home.css"
import { Link } from "react-router-dom"
import babyBowser from "../images/baby_bowser.png"
import bowser from "../images/bowser.png"
import furyBowser from "../images/fury_bowser.jpg"
import powerStar from "../images/power-star.png"

export default function Home() {

    return (
        <div className="container-xxl mt-5">
            <div className="row">
                <div className="col-lg-3">
                    <div className="card h-100" style={{width: "100%"}}>
                        <img src={babyBowser} className="card-img-top h-100" alt="baby bowser"/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#bdf9e2"}}>
                                <h5 className="card-title nintendoFont">Easy</h5>
                                <p className="card-text">12 cards. 6 matches. Should be easy, right?</p>
                                <Link to="/difficulties/easy?mode=easy"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>Play</button></Link>
                            </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card h-100" style={{width: "100%"}}>
                        <img src={bowser} className="card-img-top h-100" alt="bowser"/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#f2ab1c"}}>
                                <h5 className="card-title nintendoFont">Medium</h5>
                                <p className="card-text">18 cards. 9 matches. Intermediate players welcome!</p>
                                <Link to="/difficulties/medium?mode=medium"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>Play</button></Link>
                            </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card h-100" style={{width: "100%"}}>
                        <img src={furyBowser} className="card-img-top h-100" alt="fury bowser"/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#f32d54"}}>
                                <h5 className="card-title nintendoFont">Hard</h5>
                                <p className="card-text">24 cards. 12 matches. Oof, good luck with that.</p>
                                <Link to="/difficulties/hard?mode=hard"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>Play</button></Link>
                            </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card h-100" style={{width: "100%"}}>
                        <img src={powerStar} className="card-img-top h-100" alt="power star"/>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center" style={{backgroundColor: "#31c7fe"}}>
                                <h5 className="card-title nintendoFont">High Scores</h5>
                                <p className="card-text">See how your scores compare to all other gamers!</p>
                                <Link to="/scores"><button type="button" className="btn" style={{color: "white", backgroundColor: "#032d5f"}}>View</button></Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}