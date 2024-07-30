import React, { useRef } from 'react';
import './musicModal.css'
import theClose from '../../assets/close.png'


interface ModalProps {
    setTheModal: (e: boolean) => void,
}

const MusicModal: React.FC<ModalProps> = ({setTheModal}) => {


    const saveParams = () => {
        setTheModal(false)
    }

    return (
        <div className="modal">
            <div className="blur" onClick={() => setTheModal(false)} />
            <div className="modal__container">
                <img onClick={() => setTheModal(false)} className='close-modal' src={theClose}/>
                <h3>Add a cover!</h3>

                <form className="styled-form">
                    <label className="form-label">Image: </label>
                    <input className="file-input" type="file" accept="image/*" />
                    
                    <label className="form-label" htmlFor="title">Title: </label>
                    <input className="text-input" id='title' type="text" />

                    <label className="form-label" htmlFor="band">Band: </label>
                    <input className="text-input" id='band' type="text" />
                    
                    <label className="form-label" htmlFor="year">Year: </label>
                    <input className="text-input" id='year' type="text" />
                </form>

                <div className='btn-cont'><button onClick={saveParams}>Save</button></div>

            </div>
        </div>
    );
};

export default MusicModal;