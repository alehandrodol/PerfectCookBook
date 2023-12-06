import "./Recipes.css";
import "../dishes/Dishes.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../landing/Modal";
import DeleteCard from "../dishes/DeleteCard";
import logOut from '../assets/dishes/logOut.svg';
import sort from '../assets/dishes/sort.svg';
import search from '../assets/dishes/search.svg';
import plus from '../assets/dishes/plus.svg';
import meal from '../assets/dishes/meal.svg';
import trash from '../assets/dishes/delete.svg';
import edit from '../assets/dishes/edit.svg';

export default function Recipes() {

    const [DeleteRecipeOpened, setDeleteRecipeOpened] = useState(false);

    const openDeleteDish = () => {
        setDeleteRecipeOpened(true);
        document.body.style.overflowY = 'hidden';
        document.body.style.marginRight = '14.5px';
    }
    
    const closeDeleteRecipe = () => {
        setDeleteRecipeOpened(false)
        document.body.style.overflowY = 'auto';
        document.body.style.marginRight = 'auto';
    }

    return (
        <div className="page">

            <Modal
                visible={DeleteRecipeOpened}
                content={<DeleteCard closeFunc={closeDeleteRecipe}/>}
                closeFunc={closeDeleteRecipe}
            />

            <header className="App-header">
                <div className="header">
                    <div className='header__logo'>
                        <div className='header__logoSvg'></div>
                        <div className='header__logoTitle'>Название</div>
                    </div>
                    <div className="header__button">
                        <Link className="header__dish" to="/dishes"><p className="header__text">Блюда</p></Link>
                        <button className='header__btn-exit'><img src={logOut}></img></button>
                    </div>
                </div>
                <div className = 'header__line'></div>
            </header>

            <div className="content">
                <h1 className="title">Рецепты</h1>
                <div className="search">
                    <button type="button" className="search__sort"><img src={sort}></img></button>
                    <form name="form" className="search__form">
                        <input type="text" name="search" className="search__input" id="search-input"></input>
                        <button type="submit" className="search__btn"><img src={search} className="search__img"></img></button>
                    </form>
                </div>
                <div className="dishes">
                    <button type="button" className="dishes__btn-add">
                        <div className="dishes__container">
                            <img className="dishes__plus" src={plus}></img>
                            <p className="dishes__caption">Создать рецепт</p>
                        </div>
                    </button>
                    <div className="dish">
                        <div className="dish__container">
                            <div className="dish__image-container">
                                <Link to="/recipe">
                                    <img className="dish__img" src={meal}></img>
                                </Link>
                                <button type='button' className="dish__delete-btn" onClick={() => openDeleteDish()}><img src={trash}></img></button>
                                <button type='button' className="dish__edit-btn"><img src={edit}></img></button>
                            </div>
                            <h2 className="dish__name">Плов</h2>
                            <div className="dish__tags">
                            </div>
                        </div>
                    </div>
                    <div className="dish">
                        <div className="dish__container">
                            <div className="dish__image-container">
                                <Link to="/recipe">
                                    <img className="dish__img" src={meal}></img>
                                </Link>
                                <button type='button' className="dish__delete-btn" onClick={() => openDeleteDish()}><img src={trash}></img></button>
                                <button type='button' className="dish__edit-btn"><img src={edit}></img></button>
                            </div>
                            <h2 className="dish__name">Плов</h2>
                            <div className="dish__tags">
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