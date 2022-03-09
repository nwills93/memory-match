import React, {useState} from "react";
import "./TestCard.css"
import logo from "../images/1353380012-vector.png"
import mario from "../images/super-mario-free-clipart-png.png"

export default function TestCard() {
    const [style, setStyle] = useState(null)
    const [isFlipped, setIsFlipped] = useState(false)

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
      <div className="scene">
        <div className="card" onClick={flipHandler} style={style}>
          {/* <div className="card__face card__face--front">front</div>
          <div className="card__face card__face--back">back</div> */}
          <img src={logo} alt="logo" className="card__face card__face--front"/>
          <img src={mario} alt="mario" className="card__face card__face--back"/>
        </div>
      </div>
  );
}
