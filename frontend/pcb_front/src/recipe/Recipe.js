import "./Recipe.css";
import { Link } from "react-router-dom";
import logOut from '../assets/dishes/logOut.svg';
import recipeImg from '../assets/dishes/recipe.svg';
import edit from '../assets/dishes/edit.svg';
import { useLocation } from "react-router";
import config from '../config.json';
import { useNavigate } from "react-router-dom";

export default function Recipe() {
    let locationData = useLocation();    
    const recipe = locationData.state.recipeData
    const ingredients = recipe.ingredients.sort((a, b) => parseInt(a.id) - parseInt(b.id)).map(ingredientObject =>
        <li className="recipe__ingredient">{ingredientObject.name} <span className="recipe__quantity">{ingredientObject.quantity}</span></li>);
    const tags = recipe.tags.map(tagsObject =>
        <div className="recipe__tags__tag">{tagsObject.name}</div>);

    const navigate = useNavigate();



    
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
                        <Link className="header__recipe" to="/recipes" state={{ dishId: locationData.state.dishId}}><p className="header__text">Рецепты</p></Link>
                        <button className='header__btn-exit'><img src={logOut} onClick={() => {localStorage.removeItem('access_token'); navigate("/");}}></img></button>
                    </div>
                </div>
                <div className = 'header__line'></div>
            </header>

            <div className="content">
                <div className="recipe">
                    <h1 className="recipe__title">{recipe.name}</h1>
                    <div className="recipe__caption">
                        <p className="recipe__preparation-time">Время подготовлений: нет на бэке</p>
                        <p className="recipe__portions">Порции: нет на бэке</p>
                        <p className="recipe__cooking-time">Время приготовления: нет на бэке</p>
                    </div>
                    <div className="recipe__img-frame">
                        <img src={recipeImg} className="recipe__img"></img>
                        <button type="button" className="recipe__edit-btn"><img className="recipe__edit-img" src={edit}></img></button>
                    </div>
                    <div className="recipe__description">
                        <h2 className="recipe__description-title">Описание рецепта:</h2>
                        <p className="recipe__text">{recipe.description}</p>
                    </div>
                    <ol className="recipe__ingredients">
                        <h2 className="recipe__ingredients-title">Ингридиенты:</h2>
                        {ingredients}
                    </ol>
                    <div className="recipe__recipe">
                        <h2 className="recipe__recipe-title">Рецепт:</h2>
                        <p className="recipe__text">{recipe.cooking_flow}</p>
                    </div>
                    <div className="recipe__tags">
                        {tags}
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