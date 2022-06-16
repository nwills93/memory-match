import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../CardList.css";
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

  const initialScoreState = {
    username: "",
    time_taken: 0,
    turns_taken: 1,
    difficulty_mode: ""
  }

  const [scoreData, setScoreData] = useState({...initialScoreState})

  //cards are randomly shuffled when game begins (i.e. page initially loads)
  useEffect(() => {
    shuffleCards()
    setCardDisplay(createInitialDisplayState(cards))
    setDisabled(createInitialDisabledState(cards))
  }, [])

  //TODO figure out how to have points as a dependency but not call setTimeout twice. OR make this same logic work without having to declare points.
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

  const shuffleCards = () => {
    const shuffledCards = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card }));
      console.log("shuffled cards", shuffledCards)
    setCards(shuffledCards);
  };

  const createInitialDisplayState = (cards) => {
    const initialDisplayState = {};
    cards.forEach((card, index) => {
      initialDisplayState[index] = null
    })
    return initialDisplayState
  }

  const createInitialDisabledState = (cards) => {
    const initialDisabledState = {};
    cards.forEach((card, index) => {
      initialDisabledState[index] = null
    })
    return initialDisabledState
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

  const cardsLayout = cardDisplay && cards.map(({ front, back, cardId, id}, index) => (
    <div className={disabled[index]} key={id}>
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
      <div className="d-flex justify-content-center">
        <p className="nintendoFont" style={{fontSize: "48px", color: "#f32d54"}}>{timer}</p>
      </div>
      <TimesUpModal timer={timer}/>
      <SuccessModal points={points} cards={cards} match={match} scoreData={scoreData} setScoreData={setScoreData}/>
      <MatchModal match={match} cards={cards} points={points}/>
      <NoMatchModal match={match} />
      <div className="d-flex justify-content-center mt-4">
        <div className="card-grid">{cardsLayout}</div>
      </div>
    </>
  );
}
