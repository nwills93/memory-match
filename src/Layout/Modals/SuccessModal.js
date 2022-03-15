import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"
import Modal from 'react-modal'

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
  
   export default function MatchModal({points, cards, match}) {
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
            </Modal>
        </div>
      
    );
  }