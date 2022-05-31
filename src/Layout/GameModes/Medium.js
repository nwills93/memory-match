import React, { useState } from 'react';
import CardData from '../../common/CardData';
import GamePlay from '../GamePlay';

export default function Medium() {
    const [cards, setCards] = useState([...CardData.slice(0, 18)]);
    const [pointsToWin, setPointsToWin] = useState(18);
    const [timer, setTimer] = useState(75);

    return (
        <GamePlay 
            cards={cards}
            setCards={setCards}
            pointsToWin={pointsToWin}
            timer={timer}
            setTimer={setTimer}
        />
    )
}