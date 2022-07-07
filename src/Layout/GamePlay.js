import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { createInitialDisplayState, createInitialDisabledState } from '../utils/gamePlayHelperFunctions'
import useQuery from '../utils/useQuery'
import CardLayout from './CardLayout'
import MatchModal from "./Modals/MatchModal"
import NoMatchModal from "./Modals/NoMatchModal"
import SuccessModal from "./Modals/SuccessModal"
import TimesUpModal from "./Modals/TimesUpModal"

export default function GamePlay({ cards, setCards, pointsToWin, timer, setTimer }) {
  const [turn, setTurn] = useState(1);
  const [match, setMatch] = useState([]);
  const [points, setPoints] = useState(0);
  const history = useHistory();
  const [cardDisplay, setCardDisplay] = useState(null);
  const [disabled, setDisabled] = useState(null);

  const query = useQuery()

  const initialScoreState = {
    username: "",
    time_taken: 0,
    turns_taken: 1,
    difficulty_mode: query.get("mode")
  }

  const [scoreData, setScoreData] = useState({...initialScoreState})

  // const shuffleCards = useCallback(() => {
  //   const shuffledCards = [...cards]
  //     .sort(() => Math.random() - 0.5)
  //     .map((card) => ({ ...card }));
  //   setCards(shuffledCards);
  // }, [cards, setCards]);

  const shuffleCards = useCallback(() => {
    setCards([...cards].sort(() => Math.random() - 0.5).map((card) => ({ ...card })))
  }, [])

  //cards are randomly shuffled when game begins (i.e. page initially loads)
  useEffect(() => {
    shuffleCards()
    setCardDisplay(createInitialDisplayState(cards))
    setDisabled(createInitialDisabledState(cards))
  }, [shuffleCards])

  useEffect(() => {
    //logic for when user is picking final match. Will not set turn after gets final match
    if (
      match.length === 2 &&
      match[0].cardId === match[1].cardId &&
      points === pointsToWin - 2
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

  //Starts the timer and clears the timer when the user guesses everything correctly or if time runs out.
  useEffect(() => {
    const timeout = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1)
    }, 1000)
    if(points === pointsToWin) {
      clearInterval(timeout)
    }
    if (timer === 0) {
      clearInterval(timeout)
    }
  return () => clearInterval(timeout)
}, [timer, points])

  const cardsLayout = cardDisplay && cards.map((card, index) => (
    <CardLayout key={index} card={card} index={index} disabled={disabled} flipHandler={flipHandler} match={match} setMatch={setMatch} disabledHandler={disabledHandler} cardDisplay={cardDisplay}/>
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
      <div className="d-flex justify-content-center">
        <p className="nintendoFont" style={{fontSize: "48px", color: "#f32d54"}}>{timer}</p>
      </div>
      <TimesUpModal timer={timer}/>
      <SuccessModal points={points} cards={cards} match={match} scoreData={scoreData} setScoreData={setScoreData} timer={timer} turn={turn}/>
      <MatchModal match={match} cards={cards} points={points}/>
      <NoMatchModal match={match} />
      <div className="d-flex justify-content-center mt-4">
        <div className="card-grid">{cardsLayout}</div>
      </div>
    </>
  );
}
