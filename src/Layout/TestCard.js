import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import "./TestCard.css"
import logo from "../images/1353380012-vector.png"
import mario from "../images/super-mario-free-clipart-png.png"

export default function TestCard() {
    const [style, setStyle] = useState(null)
    const [isFlipped, setIsFlipped] = useState(false)
    const [disabled, setDisabled] = useState(null)
    const [timer, setTimer] = useState(60)
    const history = useHistory()

     //TODO: checkout React Modal for modal window ideas!

    useEffect(() => {
        const timeout = setInterval(() => {
          setTimer(prevTimer => prevTimer - 1)
        }, 1000)
      return () => clearInterval(timeout)
    }, [timer])

    useEffect(() => {
      if(timer === 0) {
        window.confirm("Time's up!") ? history.go(0) : history.push("/")
      }
    }, [timer])



    const flipHandler = () => {
        if(isFlipped === false) {
            setStyle({
                transform: "rotateY(180deg)"
            })
        } else if(isFlipped === true) {
            setStyle(null)
        }  
        setIsFlipped(!isFlipped)
    }

  return (
    <>
      <div className={disabled}>
        <div className="scene">
          <div 
            className="card" 
            onClick={() => {
              flipHandler()
              setDisabled("pe-none")
              }} 
            style={style}
          >
            <img src={logo} alt="logo" className="card__face card__face--front"/>
            <img src={mario} alt="mario" className="card__face card__face--back"/>
          </div>
        </div>
      </div>
      <h3>{timer}</h3>
    </>
    
  );
}
