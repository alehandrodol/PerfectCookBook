import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logOut from '../assets/dishes/logOut.svg';
import sort from '../assets/dishes/sort.svg';
import search from '../assets/dishes/search.svg';
import plus from '../assets/dishes/plus.svg';
import './Dishes.css';



export default function Dishes() {

    const navigate = useNavigate();
    //Проверяем залогинен ли пользователь. Если нет, то редиректим его на главную страницу.
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate("/")
        }
    }, []);
    
    return (
        <div className="page">
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
                    <button type="button" className="dishes__btn-add">
                        <div className="dishes__container">
                            <img className="dishes__plus" src={plus}></img>
                            <p className="dishes__caption">Создать блюдо</p>
                        </div>
                    </button>
                    <button type="button" className="dishes__btn-add">
                        <div className="dishes__container">
                            <img className="dishes__plus" src={plus}></img>
                            <p className="dishes__caption">Создать блюдо</p>
                        </div>
                    </button>
                    <button type="button" className="dishes__btn-add">
                        <div className="dishes__container">
                            <img className="dishes__plus" src={plus}></img>
                            <p className="dishes__caption">Создать блюдо</p>
                        </div>
                    </button>
                </div>
            </div>

            <footer className='footer'>
                <div className = 'headerBottomLine'></div>
                <p className='footer__text'>©,2023️</p>
            </footer>
        </div>
    )
}