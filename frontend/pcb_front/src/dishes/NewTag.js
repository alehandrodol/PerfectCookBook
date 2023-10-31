import React from "react";
import "./NewTag.css";

export default function NewTag({closeFunc}) {
    return (
        <aside className="popup popup__type-newTag">
            <div className="popup__content">
                <h2 className="popup__title-tag">Введите название тэга</h2>
                <form className="form" name="form">
                    <input type="text" className="popup__input-text" placeholder="Тэг"></input>
                </form>
                <div className="popup__buttons">
                    <button type="submit" className="popup__save-btn">Сохранить</button>
                    <button type="button" className="popup__leave-btn" onClick={closeFunc}>Отмена</button>
                </div>
            </div>
        </aside>
    )
}