import React, { useState } from 'react';
import CardData from '../../common/CardData';
import GamePlay from '../GamePlay'

export default function Easy() {
    const [cards, setCards] = useState([...CardData.slice(0, 12)]);
    const [pointsToWin, setPointsToWin] = useState(12);
    const [timer, setTimer] = useState(60);

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