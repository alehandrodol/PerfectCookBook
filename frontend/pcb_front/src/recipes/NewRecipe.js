import "./NewRecipe.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import logOut from '../assets/dishes/logOut.svg';
import save from '../assets/dishes/save.svg';
import Modal from "../landing/Modal";
import NewTag from "../dishes/NewTag";

export default function NewRecipe() {

    const navigate = useNavigate();

    const [NewTagOpened, setNewTagOpened] = useState(false);

    const closeNewTag = () => {
        setNewTagOpened(false)
    }
    const openNewTag = () => {
        setNewTagOpened(true);
    }
    return (
        <div className="page">

            <Modal
                visible={NewTagOpened}
                content={<NewTag closeFunc={closeNewTag}/>}
                closeFunc={closeNewTag}
            />

             <header className="App-header">
                <div className="header">
                    <div className='header__logo'>
                        <div className='header__logoSvg'></div>
                        <div className='header__logoTitle'>Название</div>
                    </div>
                    <div className="header__buttons">
                        <Link className="header__dish" to="/dishes"><p className="header__text">Блюда</p></Link>
                        <Link className="header__recipe" to="/recipes"><p className="header__text">Рецепты</p></Link>
                        <button className='header__btn-exit'><img src={logOut} onClick={() => {localStorage.removeItem('access_token'); navigate("/");}}></img></button>
                    </div>
                </div>
                <div className = 'header__line'></div>
            </header>

            <div className="content">
                <form className="newRecipe">
                    <input type="text" placeholder="Введите название блюда" className="newRecipe__title"></input>
                    <div className="newRecipe__caption">
                        <p className="newRecipe__preparation-time">Время подготовлений: нет на бэке</p>
                        <p className="newRecipe__portions">Порции: нет на бэке</p>
                        <p className="newRecipe__cooking-time">Время приготовления: нет на бэке</p>
                    </div>
                    <div className="newRecipe__img-frame">
                        <label className="newRecipe__input-imgContainer">
                            <input type='file' className="newRecipe__input-img"></input>
                        </label>
                        <button type="submit" className="newRecipe__save-btn"><img className="save-img" src={save}></img></button>
                    </div>
                    <div className="newRecipe__description">
                        <h2 className="newRecipe__description-title">Описание рецепта:</h2>
                        <textarea type='text' placeholder="Введите описание рецепта..." className="newRecipe__input-description"></textarea>
                    </div>
                    <ol className="newRecipe__ingredients">
                        <h2 className="newRecipe__ingredients-title">Ингридиенты:</h2>
                        <textarea type='text' placeholder="Введите название ингредиента..." className="newRecipe__input-ingredient"></textarea>
                    </ol>
                    <div className="newRecipe__recipe">
                        <h2 className="newRecipe__recipe-title">Рецепт:</h2>
                        <textarea type='text' placeholder="Введите рецепт..." className="newRecipe__input-recipe"></textarea>
                    </div>
                    <h1 className="newRecipe__tag-title">Добаьвте тег</h1>
                    <button type="button" className="newRecipe__add-tag" onClick={openNewTag}></button>
                    <div className="newRecipe__tags">
                    </div>
                </form>
            </div>
            <footer className='footer'>
                <div className = 'headerBottomLine'></div>
                <p className='footer__text'>©,2023️</p>
            </footer>

        </div>
    )
}