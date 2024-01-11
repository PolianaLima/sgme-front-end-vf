import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';

const ModalComponent = ({ isOpen, onRequestClose, children }) => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Verifica o tamanho da janela quando o componente é montado
        handleResize();

        // Adiciona um ouvinte de redimensionamento para atualizar o estado quando a janela for redimensionada
        window.addEventListener('resize', handleResize);

        // Remove o ouvinte de redimensionamento quando o componente é desmontado
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const customStyles = {
        content: {
            width: isMobile ? '88%' : '25%',
            height: isMobile ? '15%' : '15%',
            margin: isMobile ? 'auto' : 'auto',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            style={customStyles}
            ariaHideApp={false}

        >


              <div className="d-flex flex-column justify-content-center align-items-center ">
                  {children}
                  <div className="d-flex justify-content-end">
                  <button className="btn btn-warning" onClick={onRequestClose}>OK</button>
              </div>
              </div>


        </Modal>
    );
};

export default ModalComponent;
