import React from "react";
import "./NewTag.css";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewTag({closeFunc, updateNewTags}) {
    const [inputNewTag, setInputNewTag] = useState('');

    return (
        <aside className="popup popup__type-newTag">
            <div className="popup__content">
                <h2 className="popup__title-tag">Введите название тэга</h2>
                <form className="form" name="form">
                    <input type="text" className="popup__input-text" placeholder="Тэг" value={inputNewTag} onInput={e => setInputNewTag(e.target.value)}></input>
                </form>
                <div className="popup__buttons">
                    <button type="submit" className="popup__save-btn" onClick={() => {if(inputNewTag != '') if(!updateNewTags(inputNewTag)) toast.error('Тэг "' + inputNewTag + '" уже существует'); else closeFunc()}}>Сохранить</button>
                    <button type="button" className="popup__leave-btn" onClick={closeFunc}>Отмена</button>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </aside>
    )
}