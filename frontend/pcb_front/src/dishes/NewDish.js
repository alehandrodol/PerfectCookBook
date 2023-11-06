import React from "react";
import { useState } from 'react';
import "./NewDish.css";
import NewTag from "./NewTag.js";
import Modal from "../landing/Modal";
import tagAdd from "../assets/dishes/tagAdd.svg";
import cross from "../assets/dishes/cross.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json';

let createDish = async (name, tags) => {
    let success = false
    if (name.length < 3) {
        toast.error('Слишком короткое название');
        return success
    }
    const createDishRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify({
            'name': name,
            'tags': tags
        })
    };
    await fetch(config.backend + '/dishes/create/', createDishRequest)
        .then(response => response.json())
        .then(data => {
            if (data.name == name) {
                success = true
            }
        });
    return success
}



export default function NewDish({closeFunc, alertDishCreated}) {

    const [newTags, setNewTags] = useState([]);
    const [inputTagName, setInputTagName] = useState('');

    const [NewTagOpened, setNewTagOpened] = useState(false);

    const closeNewTag = () => {
        setNewTagOpened(false)
    }
    const openNewTag = () => {
        setNewTagOpened(true);
    }

    const updateNewTags = (newTag) => {
        if (newTags.includes(newTag)) return false
        let updatedTags = newTags;
        updatedTags.push(newTag);
        setNewTags(updatedTags);
        return true
    }



    return (
        <aside className="popup popup__type-newDish">

            <Modal
                visible={NewTagOpened}
                content={<NewTag closeFunc={closeNewTag} updateNewTags = {updateNewTags}/>}
                closeFunc={closeNewTag}
            />

            <div className="popup__object">
                <form className="form" name="form">
                    <label className="form__input-imgContainer">
                        <input type='file' className="form__input-img"></input>
                    </label>
                    <h2 className="form__imgTitle">Загрузите изоображение</h2>
                    <input type='text' placeholder="Введите название блюда" className="form__input-text" value={inputTagName} onInput={e => setInputTagName(e.target.value)}></input>
                    <h2 className="form__tagTitle">Добавьте тег</h2>
                    <div className="form__tags">
                        {newTags.map(newTag => <div className="form__tag">{newTag}</div>)}
                        {newTags.length < 4 ? <button type='button' className="form__btn-addTag" onClick={openNewTag}><img src={tagAdd} className="popup__img-tag"></img></button>: null}
                    </div>
                    
                    <button type='button' className="form__btn-submit" onClick={() => createDish(inputTagName, newTags).then(success => {if(success) {closeFunc(); alertDishCreated(inputTagName)}})}>Сохранить</button>
                </form>
                <button type="button" className="popup__clpose-btn" onClick={closeFunc}><img src={cross} className="popup__img-cross"></img></button>
            </div>
        </aside>
    )
}
