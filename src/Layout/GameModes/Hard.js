import React, { useState } from 'react';
import CardData from '../../common/CardData';
import GamePlay from '../GamePlay';

export default function Hard() {
    const [cards, setCards] = useState([...CardData]);
    const [pointsToWin, setPointsToWin] = useState(24);
    const [timer, setTimer] = useState(90);

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