import React from "react";
import { useState } from 'react';
import "./NewDish.css";
import NewTag from "./NewTag.js";
import Modal from "../landing/Modal";
import tagAdd from "../assets/dishes/tagAdd.svg";
import cross from "../assets/dishes/cross.svg";

export default function NewDish({closeFunc}) {

    const [NewTagOpened, setNewTagOpened] = useState(false);

    const closeNewTag = () => {
        setNewTagOpened(false)
        document.body.style.overflowY = 'auto';
        document.body.style.marginRight = 'auto';
    }
    const openNewTag = () => {
        setNewTagOpened(true);
        document.body.style.overflowY = 'hidden';
        document.body.style.marginRight = '14.5px';
    }

    return (
        <aside className="popup popup__type-newDish">

            <Modal
                visible={NewTagOpened}
                content={<NewTag closeFunc={closeNewTag}/>}
                closeFunc={NewTag}
            />

            <div className="popup__object">
                <form className="form" name="form">
                    <label className="form__input-imgContainer">
                        <input type='file' className="form__input-img"></input>
                    </label>
                    <h2 className="form__imgTitle">Загрузите изоображение</h2>
                    <input type='text' placeholder="Введите название блюда" className="form__input-text"></input>
                    <h2 className="form__tagTitle">Добавьте тег</h2>
                    <button type='button' className="form__btn-addTag" onClick={openNewTag}><img src={tagAdd} className="popup__img-tag"></img></button>
                    <button type='submit' className="form__btn-submit">Сохранить</button>
                </form>
                <button type="button" className="popup__clpose-btn" onClick={closeFunc}><img src={cross} className="popup__img-cross"></img></button>
            </div>
        </aside>
    )
}