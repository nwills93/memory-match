import React, { useEffect } from 'react'
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
  //Modal.setAppElement('#root');
  
   export default function MatchModal({match}) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
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
        if(match.length === 2 && match[0].cardId !== match[1].cardId) {
            openModal()
        }
    }, [match])

    useEffect(() => {
        setTimeout(() => {
            closeModal()
        }, 1000)
    }, [modalIsOpen])
  
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Pick Again.</h2>
            </Modal>
        </div>
      
    );
  }