import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import CardData from "../common/CardData";
import "../CardList.css";

export default function CardList() {
  const [cards, setCards] = useState([]);
  console.log(cards);
  
  const shuffleCards = () => {
    const shuffledCards = [...CardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards);
    
  };

  const cardsLayout = cards.map((card, index) => (
    <div className="card" style={{ width: "18rem" }} key={index}>
      <img src={`${card.front}`} className="card-img-top" alt="question" />
      <img src={`${card.back}`} className="card-img-top" alt="shape" />
    </div>
  ));

  return (
    <>
        <button type="button" className="btn btn-primary" onClick={shuffleCards}>Shuffle</button>
        <div className="d-flex">
        <div className="card-grid">{cardsLayout}</div>
        </div>
    </>
    
  );
}
