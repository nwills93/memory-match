import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardData from "../common/CardData";
import "../CardList.css";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const  [turn, setTurn] = useState(1)
  const [match, setMatch] = useState([]);
  const [points, setPoints] = useState(0)

  const history = useHistory()
  const initialDisplayState = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  }
  

  
  useEffect(() => {
    if (match.length === 2 && match[0].cardId === match[1].cardId) {
      setTimeout(() => {
        setPoints(prevPoints => prevPoints + 2)
        setMatch([])
        setTurn(prevTurn => prevTurn + 1)
      }, 1000)
    }
    else if (match.length === 2 && match[0].cardId !== match[1].cardId) {
      setTimeout(() => {
        setCardDisplay({
          ...cardDisplay,
          [match[0].index]: false,
          [match[1].index]: false,
        })
        setMatch([])
        setTurn(prevTurn => prevTurn + 1)
      }, 1000);
    }
  }, [match.length === 2])

  const [cardDisplay, setCardDisplay] = useState({...initialDisplayState})

  const flipHandler = (index) => { 
    const flipStatus = cardDisplay[index]
    setCardDisplay({
      ...cardDisplay,
      [index]: !flipStatus
    })
  }
  
  const shuffleCards = () => {
    const shuffledCards = [...CardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card}))
    setCards(shuffledCards);
    
  };




  const cardsLayout = cards.map(({front, back, cardId}, index) => (
    <div className="card" style={{ width: "10rem" }} key={index} onClick={() => {flipHandler(index); setMatch([...match, {index, cardId}])}}>
      {!cardDisplay[index] ? <img src={`${front}`} style={{objectFit: "scale-down", width: "100%", height: "100%"}} className="card-img-top rounded" alt="question" />
      : <img src={`${back}`} className="card-img-top" alt="shape" />}   
    </div>
  ));

  return (
    <>
        <div className="d-flex justify-content-center mt-2"> 
          <button type="button" className="btn btn-primary ms-2" onClick={shuffleCards}>Shuffle</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => history.push("/")}>Home</button>
          <button type="button" className="btn ms-2" style={{color: "white", backgroundColor: "#032d5f"}} onClick={() => history.go(0)}>Reset</button>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <h3 style={{color: "#032d5f"}}>Turn: {turn}</h3>
        </div>
        {match.length === 2 &&
          (match[0].cardId === match[1].cardId ? (
          <div className="d-flex justify-content-center">
            <h3 className="text-success">Match!</h3>
          </div>
          ) : (
          <div className="d-flex justify-content-center">
            <h3 className="text-danger">Pick again.</h3>
          </div> 
          )
        )}
        <div>
          {(cards.length !== 0 && points === cards.length) && (
            <div className="d-flex justify-content-center">
              <h2 className="text-success">You matched everything correctly, good memory!</h2>
              <button type="button" className="btn btn-danger" onClick={() => history.go("/")}>Play Again</button>
              <button type="button" className="btn btn-danger" onClick={() => history.push("/")}>Home</button>
            </div>  
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <div className="card-grid">{cardsLayout}</div>
        </div>
    </>
    
  );
}
