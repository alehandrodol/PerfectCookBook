import "./Recipes.css";
import "../dishes/Dishes.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "../landing/Modal";
import DeleteCard from "./DeleteCard";
import logOut from '../assets/dishes/logOut.svg';
import sort from '../assets/dishes/sort.svg';
import search from '../assets/dishes/search.svg';
import plus from '../assets/dishes/plus.svg';
import meal from '../assets/dishes/meal.svg';
import trash from '../assets/dishes/delete.svg';
import edit from '../assets/dishes/edit.svg';
import { useLocation } from "react-router";
import config from '../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Recipes(props) {
    let locationData = useLocation();
    const [DeleteRecipeOpened, setDeleteRecipeOpened] = useState(false);


    const [recipeIdToDel, setRecipeIdToDel] = useState();
    const [recipeNameToDel, setRecipeNameToDel] = useState();

    const openDeleteRecipe = (recipeInfo) => {
        setRecipeIdToDel(recipeInfo.id);
        setRecipeNameToDel(recipeInfo.name);
        setDeleteRecipeOpened(true);
        document.body.style.overflowY = 'hidden';
        document.body.style.marginRight = '14.5px';
    }
    
    const closeDeleteRecipe = () => {
        setDeleteRecipeOpened(false)
        document.body.style.overflowY = 'auto';
        document.body.style.marginRight = 'auto';
        getRecipes();
    }


    const alertRecipeDeleted = (recipeName) => {
        toast.warn('Рецепт "' + recipeName + '" удален');
    }
    const navigate = useNavigate();
    //Проверяем залогинен ли пользователь. Если нет, то редиректим его на главную страницу.
    useEffect(() => {

        const headers = {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
        fetch(config.backend + '/auth/check_me', {
                headers
            })
            .then(response => response.json())
            .then(data => {
                if (data.detail == 'Could not validate credentials') {
                    navigate("/");
                }
                else {
                    getRecipes();
                }
            });
    }, []);


    const [recipes, setRecipes] = useState();
    
    let getRecipes = () => {
        const headers = {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
        fetch(config.backend + '/recipes/?dish_id=' + locationData.state.dishId, {
                headers
            })
            .then(response => response.json())
            .then(data => {
                let recipesObject = data;
                setRecipes(recipesObject.recipes.sort((a, b) => parseInt(a.id) - parseInt(b.id)).map(recipeObject =>
                    <div className="dish">
                        <div className="dish__container">
                            <div className="dish__image-container">
                                <Link to="/recipe" state={{ recipeData: recipeObject, dishId: locationData.state.dishId }}>
                                    <img className="dish__img" src={meal}></img>
                                </Link>
                                <button type='button' className="dish__delete-btn"><img src={trash} onClick={() => openDeleteRecipe(recipeObject)}></img></button>
                                <button type='button' className="dish__edit-btn"><img src={edit} ></img></button> {/* добавить потом сюда onClick={() => openEditRecipe(recipeObject)} */}
                            </div>
                            <h2 className="dish__name">
                                {/* <b>ID: {dishObject.id} | </b> */} 
                                {recipeObject.name}
                            </h2>
                            <div className="dish__tags">
                                {recipeObject.tags.map(recipeTag =>
                                    <div className="dish__tag">{recipeTag.name}</div>
                                )}
                            </div>
                        </div>
                    </div>
                ));
                
            });
    }


    return (
        <div className="page">

            <Modal
                visible={DeleteRecipeOpened}
                content={<DeleteCard closeFunc={closeDeleteRecipe} alertRecipeDeleted={alertRecipeDeleted} recipeId = {recipeIdToDel} recipeName = {recipeNameToDel}/>}
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
                        <button className='header__btn-exit'><img src={logOut} onClick={() => {localStorage.removeItem('access_token'); navigate("/");}}></img></button>
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
                    {recipes}
                    
                </div>
            </div>

            <footer className='footer'>
                <div className = 'headerBottomLine'></div>
                <p className='footer__text'>©,2023️</p>
            </footer>
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
        </div>
    )
}