import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardData from "../common/CardData";
import "../CardList.css";
import "./TestCard.css"

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(1);
  const [match, setMatch] = useState([]);
  const [points, setPoints] = useState(0);
  const history = useHistory();

  const initialDisplayState = {
    0: null,
    1: null,
    2: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
  };

  const [cardDisplay, setCardDisplay] = useState({ ...initialDisplayState });

  const initialDisabledState = {
    0: null,
    1: null,
    2: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
  };

  const [disabled, setDisabled] = useState(initialDisabledState)

  //cards are randomly shuffled when game begins (i.e. page initially loads)
  useEffect(() => {
    shuffleCards()
  }, [])

  //TODO figure out how to have points as a dependency but not call setTimeout twice. OR make this same logic work without having to declare points.
  useEffect(() => {
    //logic for when user is picking final match. Will not set turn after gets final match
    if (
      match.length === 2 &&
      match[0].cardId === match[1].cardId &&
      points === 10
    ) {
      setTimeout(() => {
        setMatch([]);
        setPoints((prevPoints) => prevPoints + 2);
      }, 1000);
    } else if (match.length === 2 && match[0].cardId === match[1].cardId) {
      //logic for when user matches CORRECTLY.
      setTimeout(() => {
        setPoints((prevPoints) => prevPoints + 2);
        setMatch([]);
        setTurn((prevTurn) => prevTurn + 1);
      }, 1000);
    }
  }, [match]);

  useEffect(() => {
    //logic for when user matches INCORRECTLY.
    if (match.length === 2 && match[0].cardId !== match[1].cardId) {
      setTimeout(() => {
        setDisabled((prevDisabledState) => {
          return {
            ...prevDisabledState,
            [match[0].index]: null,
            [match[1].index]: null,
          }
        })
        setCardDisplay((prevCardDisplay) => {
          return {
            ...prevCardDisplay,
            [match[0].index]: null,
            [match[1].index]: null,
          };
        });
        setMatch([]);
        setTurn((prevTurn) => prevTurn + 1);
      }, 1000);
    }
  }, [match]);

  const flipHandler = (index) => {
    setCardDisplay({
      ...cardDisplay,
      [index]: {transform: "rotateY(180deg)"}
    })
  }

  const disabledHandler = (index) => {
    setDisabled({
      ...disabled,
      [index]: "pe-none"
    })
  }

  const shuffleCards = () => {
    const shuffledCards = [...CardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card }));
    setCards(shuffledCards);
  };

  const cardsLayout = cards.map(({ front, back, cardId}, index) => (
    <div className={disabled[index]}>
      <div className="scene">
          <div 
            className="card" 
            onClick={() => {
              flipHandler(index);
              setMatch([...match, {index, cardId}])
              disabledHandler(index)
            }} 
            style={cardDisplay[index]}
          >
            <img src={front} alt="logo" className="card__face"/>
            <img src={back} alt="mario" className="card__face card__face--back"/>
          </div>
        </div>
      </div>
  ))

  return (
    <>
      <div className="d-flex justify-content-center mt-2">
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
