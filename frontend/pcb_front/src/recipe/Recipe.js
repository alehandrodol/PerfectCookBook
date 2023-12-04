import "./Recipe.css";
import { Link } from "react-router-dom";
import logOut from '../assets/dishes/logOut.svg';
import recipe from '../assets/dishes/recipe.svg';
import edit from '../assets/dishes/edit.svg';

export default function Recipe() {
    return (
        <div className="page">
             <header className="App-header">
                <div className="header">
                    <div className='header__logo'>
                        <div className='header__logoSvg'></div>
                        <div className='header__logoTitle'>Название</div>
                    </div>
                    <div className="header__buttons">
                        <Link className="header__dish" to="/dishes"><p className="header__text">Блюда</p></Link>
                        <Link className="header__recipe" to="/recipes"><p className="header__text">Рецепты</p></Link>
                        <button className='header__btn-exit'><img src={logOut}></img></button>
                    </div>
                </div>
                <div className = 'header__line'></div>
            </header>

            <div className="content">
                <div className="recipe">
                    <h1 className="recipe__title">Блюдо для пса</h1>
                    <div className="recipe__caption">
                        <p className="recipe__preparation-time">Время подготовлений: 10 мин</p>
                        <p className="recipe__portions">Порции: 4</p>
                        <p className="recipe__cooking-time">Время приготовления: 5 мин</p>
                    </div>
                    <div className="recipe__img-frame">
                        <img src={recipe} className="recipe__img"></img>
                        <button type="button" className="recipe__edit-btn"><img className="recipe__edit-img" src={edit}></img></button>
                    </div>
                    <div className="recipe__description">
                        <h2 className="recipe__description-title">Описание рецепта:</h2>
                        <p className="recipe__text">Супер вкусный и простой рецепт. Обожаю его готовить в полночь полнолуние. Из плюсов ингридиенты легко найти на улице, из минусов - они иногда кричат.</p>
                    </div>
                    <ol className="recipe__ingredients">
                        <h2 className="recipe__ingredients-title">Ингридиенты:</h2>
                        <li className="recipe__ingredient">Укроп обычный <span className="recipe__quantity">1 шт.</span></li>
                        <li className="recipe__ingredient">Укроп обычный <span className="recipe__quantity">1 шт.</span></li>
                        <li className="recipe__ingredient">Укроп обычный <span className="recipe__quantity">1 шт.</span></li>
                        <li className="recipe__ingredient">Укроп обычный <span className="recipe__quantity">1 шт.</span></li>
                        <li className="recipe__ingredient">Укроп обычный <span className="recipe__quantity">1 шт.</span></li>
                        <li className="recipe__ingredient">Укроп обычный <span className="recipe__quantity">1 шт.</span></li>
                        <li className="recipe__ingredient">Укроп обычный <span className="recipe__quantity">1 шт.</span></li>
                    </ol>
                    <div className="recipe__recipe">
                        <h2 className="recipe__recipe-title">Рецепт:</h2>
                        <p className="recipe__text">Берем сначала укропу, потом кошачью жопу, 25 картошек, 17 мандавошек, ведро воды и хуй туды, охапку дров и плов готов</p>
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