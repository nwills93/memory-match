import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"
import Modal from 'react-modal'
import {createNewScore} from '../../utils/api'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#root');
  
   export default function MatchModal({points, cards, match, scoreData, setScoreData}) {
    let subtitle;
    const history = useHistory()
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#032d5f';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    useEffect(() => {
        if(cards.length !== 0 && points === cards.length) {
            openModal()
        }
    }, [match, points, cards.length])
  
    const handleChange = ({target}) => {
        setScoreData({
            ...scoreData,
            [target.name]: target.value
        })
    }

    const handleSubmit = (event) => {
        const ac = new AbortController()
        event.preventDefault()
        createNewScore(scoreData, ac.signal)
            .then(() => {
                closeModal();
                history.push("/scores");
            })
        return () => ac.abort()
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You matched everything correctly, good memory!</h2>
                <div className="d-flex justify-content-center">
                    <button 
                        type="button" 
                        className="btn"
                        style={{color: "white", backgroundColor: "#032d5f"}} 
                        onClick={() => {
                            closeModal()
                            history.go(0)
                        }}
                    >
                    Play Again
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary ms-2"
                        onClick={() => {
                            closeModal()
                            history.push("/")
                        }}
                    >
                    Home
                    </button>
                </div>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Submit your score!</legend>
                            <div>
                                <label htmlFor="username" className="form-label">
                                    User Name:
                                </label>
                                <input
                                    type="text" 
                                    value={scoreData.username}
                                    onChange={handleChange}
                                    name="username"
                                    id="username"
                                    className="form-control"
                                />
                                <label htmlFor="difficulty_mode" className="form-label">
                                    Difficulty:
                                </label>
                                <input 
                                    type="text"
                                    value={scoreData.difficulty_mode}
                                    onChange={handleChange}
                                    name="difficulty_mode"
                                    id="difficulty_mode"
                                    className="form-control"
                                />
                                <label htmlFor="time_taken" className="form-label">
                                    Time Taken (in seconds):
                                </label>
                                <input
                                    type="number" 
                                    value={scoreData.time_taken}
                                    onChange={handleChange}
                                    name="time_taken"
                                    id="time_taken"
                                    className="form-control"
                                />
                                <label htmlFor="turns_taken" className="form-label">
                                    Turns Taken:
                                </label>
                                <input
                                    type="number" 
                                    value={scoreData.turns_taken}
                                    onChange={handleChange}
                                    name="turns_taken"
                                    id="turns_taken"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn mt-2" style={{color: "white", backgroundColor: "#032d5f"}}>Submit</button>
                        </fieldset>   
                    </form>
            </Modal>
        </div>
      
    );
  }