import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardData from "../common/CardData";
import "../CardList.css";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(1);
  const [match, setMatch] = useState([]);
  const [points, setPoints] = useState(0);
  const [style, setStyle] = useState(null)
  const [isFlipped, setIsFlipped] = useState(false)

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
  };

  const [cardDisplay, setCardDisplay] = useState({ ...initialDisplayState });
  const history = useHistory();

  //TODO figure out how to have price as a dependency but not call setTimeout twice. OR make this same logic work without having to declare price.
  useEffect(() => {
    //useEffect for when user is picking final match. Will not set turn after gets final match
    if (
      match.length === 2 &&
      match[0].cardId === match[1].cardId &&
      points === 8
    ) {
      setTimeout(() => {
        setMatch([]);
        setPoints((prevPoints) => prevPoints + 2);
      }, 1000);
    } else if (match.length === 2 && match[0].cardId === match[1].cardId) {
      //useEffect for when user matches CORRECTLY.
      setTimeout(() => {
        setPoints((prevPoints) => prevPoints + 2);
        setMatch([]);
        setTurn((prevTurn) => prevTurn + 1);
      }, 1000);
    }
  }, [match]);

  useEffect(() => {
    //useEffect for when user matches INCORRECTLY.
    if (match.length === 2 && match[0].cardId !== match[1].cardId) {
      setTimeout(() => {
        setCardDisplay((prevCardDisplay) => {
          return {
            ...prevCardDisplay,
            [match[0].index]: false,
            [match[1].index]: false,
          };
        });
        setMatch([]);
        setTurn((prevTurn) => prevTurn + 1);
      }, 1000);
    }
  }, [match]);

  const flipHandler = (index) => {
    const flipStatus = cardDisplay[index];
    setCardDisplay({
      ...cardDisplay,
      [index]: !flipStatus,
    });
  };

//   const flipHandler = (index) => {
//     const flipStatus = cardDisplay[index];
//     if(flipStatus === false) {
//         setStyle({
//             transform: "rotateY(180deg)"
//         })
//     } else if(isFlipped === true) {
//         setStyle(null)
//     }  
//     setIsFlipped(!isFlipped)
// }

  const shuffleCards = () => {
    const shuffledCards = [...CardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card }));
    setCards(shuffledCards);
  };

  const cardsLayout = cards.map(({ front, back, cardId }, index) => (
    <div
      className="card border border-secondary border-5 rounded-3 flip-card"
      style={{ overflow: "hidden", minWidth: "10rem", maxWidth: "10rem" }}
      key={index}
      onClick={() => {
        flipHandler(index);
        setMatch([...match, { index, cardId }]);
      }}
    >
      {!cardDisplay[index] ? (
        <img
          src={`${front}`}
          style={{ maxWidth: "10rem", minHeight: "10rem" }}
          className="card-img-top"
          alt="question"
        />
      ) : (
        <img
          src={`${back}`}
          style={{ minWidth: "10rem", minHeight: "10rem", maxHeight: "10rem" }}
          className="card-img-top"
          alt="shape"
        />
      )}
    </div>
  ));

  // const cardsLayout = cards.map(({ front, back, cardId}, index) => (
  //   <div className="scene">
  //       <div className="card" onClick={() => flipHandler(index)} style={style}>
  //         <img src={front} alt="logo" className="card__face card__face--front"/>
  //         <img src={back} alt="mario" className="card__face card__face--back"/>
  //       </div>
  //     </div>
  // ))

  return (
    <>
      <div className="d-flex justify-content-center mt-2">
        <button
          type="button"
          className="btn btn-primary ms-2"
          onClick={shuffleCards}
        >
          Shuffle
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => history.push("/")}
        >
          Home
        </button>
        <button
          type="button"
          className="btn ms-2"
          style={{ color: "white", backgroundColor: "#032d5f" }}
          onClick={() => history.go(0)}
        >
          Reset
        </button>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <h3 style={{ color: "#032d5f" }}>Turn: {turn}</h3>
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
        ))}
      <div>
        {cards.length !== 0 && points === cards.length && (
          <div className="d-flex justify-content-center">
            <h2 style={{ color: "#032d5f" }}>
              You matched everything correctly, good memory!
            </h2>
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => history.go("/")}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <div className="card-grid">{cardsLayout}</div>
      </div>
    </>
  );
}
