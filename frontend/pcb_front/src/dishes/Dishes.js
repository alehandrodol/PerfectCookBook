import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NewDish from "./NewDish";
import Modal from "../landing/Modal";
import logOut from '../assets/dishes/logOut.svg';
import sort from '../assets/dishes/sort.svg';
import search from '../assets/dishes/search.svg';
import plus from '../assets/dishes/plus.svg';
import meal from '../assets/dishes/meal.svg';
import trash from '../assets/dishes/delete.svg';
import edit from '../assets/dishes/edit.svg';

import './Dishes.css';



export default function Dishes() {

    const [NewDishOpened, setNewDishOpened] = useState(false);

    const closeNewDish = () => {
        setNewDishOpened(false)
        document.body.style.overflowY = 'auto';
        document.body.style.marginRight = 'auto';
    }
    const openNewDish = () => {
        setNewDishOpened(true);
        document.body.style.overflowY = 'hidden';
        document.body.style.marginRight = '14.5px';
    }
    const navigate = useNavigate();
    //Проверяем залогинен ли пользователь. Если нет, то редиректим его на главную страницу.
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate("/")
        }
    }, []);
    
    return (
        <div className="page">

            <Modal
                visible={NewDishOpened}
                content={<NewDish closeFunc={closeNewDish}/>}
                closeFunc={NewDish}
            />

            <header className="App-header">
                <div className="header">
                    <div className='header__logo'>
                        <div className='header__logoSvg'></div>
                        <div className='header__logoTitle'>Название</div>
                    </div>
                    <button className='header__btn-exit'><img src={logOut}></img></button>
                </div>
                <div className = 'header__line'></div>
            </header>

            <div className="content">
                <h1 className="title">Блюда</h1>
                <div className="search">
                    <button type="button" className="search__sort"><img src={sort}></img></button>
                    <form name="form" className="search__form">
                        <input type="text" name="search" className="search__input" id="search-input"></input>
                        <button type="submit" className="search__btn"><img src={search} className="search__img"></img></button>
                    </form>
                </div>
                <div className="dishes">
                    <button type="button" className="dishes__btn-add" onClick={openNewDish}>
                        <div className="dishes__container">
                            <img className="dishes__plus" src={plus}></img>
                            <p className="dishes__caption">Создать блюдо</p>
                        </div>
                    </button>
                    <div className="dish">
                        <div className="dish__container">
                            <div className="dish__image-container">
                                <img className="dish__img" src={meal}></img>
                                <button type='button' className="dish__delete-btn"><img src={trash}></img></button>
                                <button type='button' className="dish__edit-btn"><img src={edit}></img></button>
                            </div>
                            <h2 className="dish__name">Пончик</h2>
                            <div className="dish__tags">
                                <div className="dish__tag">тэг</div>
                                <div className="dish__tag">тэг</div>
                                <div className="dish__tag">тэг</div>
                                <div className="dish__tag">тэг</div>
                            </div>
                        </div>
                    </div>
                    <div className="dish">
                        <div className="dish__container">
                            <div className="dish__image-container">
                                <img className="dish__img" src={meal}></img>
                                <button type='button' className="dish__delete-btn"><img src={trash}></img></button>
                                <button type='button' className="dish__edit-btn"><img src={edit}></img></button>
                            </div>
                            <h2 className="dish__name">Пончик</h2>
                            <div className="dish__tags">
                                <div className="dish__tag">тэг</div>
                                <div className="dish__tag">тэг</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className='footer'>
                <div className = 'headerBottomLine'></div>
                <p className='footer__text'>©,2023️</p>
            </footer>
        </div>
    )
}