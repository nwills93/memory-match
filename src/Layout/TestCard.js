import React, {useEffect, useState} from "react";
import "./TestCard.css"
import "../App.css"
import logo from "../images/1353380012-vector.png"
import mario from "../images/super-mario-free-clipart-png.png"
import TimesUpModal from "./Modals/TimesUpModal"


export default function TestCard() {
    const [style, setStyle] = useState(null)
    const [isFlipped, setIsFlipped] = useState(false)
    const [disabled, setDisabled] = useState(null)
    const [timer, setTimer] = useState(60)

    // useEffect(() => {
    //     const timeout = setInterval(() => {
    //       setTimer(prevTimer => prevTimer - 1)
    //     }, 1000)
    //     if (timer === 0) {
    //       clearInterval(timeout)
    //     }
    //   return () => clearInterval(timeout)
    // }, [timer])


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
      <div className="d-flex justify-content-end">
        <p className="nintendoFont" style={{fontSize: "48px"}}>{timer}</p>
      </div>
      <TimesUpModal timer={timer}/>
    </>
    
  );
}
