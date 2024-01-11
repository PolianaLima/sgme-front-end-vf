import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';



const ModalInfo = ({isOpen, onRequestClose, children}) => {

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
            width: isMobile ? '90%' : '25%',
            height: isMobile ? '45%' : '35%',
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


            <div className="d-sm-flex justify-content-center flex-column align-items-center h-100 ">
                {children}
                <div className="d-flex w-100 justify-content-end">
                    <p className="text-warning pointer-cursor fw-bold" onClick={onRequestClose}>Fechar</p>
                </div>
            </div>


        </Modal>
    );
};

export default ModalInfo;
