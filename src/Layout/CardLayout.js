import React from "react";
import "./CardLayout.css";

export default function CardLayout({
  card,
  index,
  disabled,
  flipHandler,
  match,
  setMatch,
  disabledHandler,
  cardDisplay,
}) {

    const { front, back, cardId, id } = card

  return (
    <div className={disabled[index]} key={id}>
      <div className="scene">
        <div
          className="card"
          onClick={() => {
            flipHandler(index);
            setMatch([...match, { index, cardId }]);
            disabledHandler(index);
          }}
          style={cardDisplay[index]}
        >
          <img src={front} alt="logo" className="card__face" />
          <img src={back} alt="mario" className="card__face card__face--back" />
        </div>
      </div>
    </div>
  );
}
