import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NewDish from "./NewDish";
import EditDish from "./EditDish";
import DeleteCard from './DeleteCard';
import Modal from "../landing/Modal";
import logOut from '../assets/dishes/logOut.svg';
import sort from '../assets/dishes/sort.svg';
import search from '../assets/dishes/search.svg';
import plus from '../assets/dishes/plus.svg';
import meal from '../assets/dishes/meal.svg';
import trash from '../assets/dishes/delete.svg';
import edit from '../assets/dishes/edit.svg';
import config from '../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dishes.css';

export default function Dishes() {

    const [NewDishOpened, setNewDishOpened] = useState(false);
    const [DeleteDishOpened, setDeleteDishOpened] = useState(false);
    const [EditDishOpened, setEditDishOpened] = useState(false);

    const closeNewDish = () => {
        setNewDishOpened(false)
        document.body.style.overflowY = 'auto';
        document.body.style.marginRight = 'auto';
        getDishes();
    }
    const openNewDish = () => {
        setNewDishOpened(true);
        document.body.style.overflowY = 'hidden';
        document.body.style.marginRight = '14.5px';
    }

    const closeEditDish = () => {
        setEditDishOpened(false)
        document.body.style.overflowY = 'auto';
        document.body.style.marginRight = 'auto';
        getDishes();
    }
    const openEditDish = (dishInfo) => {
        setDishToEdit(dishInfo)
        setEditDishOpened(true);
        document.body.style.overflowY = 'hidden';
        document.body.style.marginRight = '14.5px';
    }

    const closeDeleteDish = () => {
        setDeleteDishOpened(false)
        document.body.style.overflowY = 'auto';
        document.body.style.marginRight = 'auto';
        getDishes();
    }

    const [dishIdToDel, setDishIdToDel] = useState();
    const [dishNameToDel, setDishNameToDel] = useState();
    const [dishToEdit, setDishToEdit] = useState();

    const openDeleteDish = (dishInfo) => {
        setDishIdToDel(dishInfo.id);
        setDishNameToDel(dishInfo.name);
        setDeleteDishOpened(true);
        document.body.style.overflowY = 'hidden';
        document.body.style.marginRight = '14.5px';
    }



    const alertDishCreated = (dishName) => {
        toast.success('Блюдо "' + dishName + '" успешно добавлено!');
    }

    const alertDishDeleted = (dishName) => {
        toast.warn('Блюдо "' + dishName + '" удалено');
    }

    const alertDishEdited = (dishName) => {
        toast.success('Блюдо "' + dishName + '" изменено');
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
                    navigate("/")
                }
            });
    }, []);

    
    const [dishes, setDishes] = useState();
    
    let getDishes = () => {
        const headers = {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
        fetch(config.backend + '/dishes', {
                headers
            })
            .then(response => response.json())
            .then(data => {
                let dishesObject = data;
                setDishes(dishesObject.dishes.sort((a, b) => parseInt(a.id) - parseInt(b.id)).map(dishObject =>
                    <div className="dish">
                        <div className="dish__container">
                            <div className="dish__image-container">
                                <img className="dish__img" src={meal}></img>
                                <button type='button' className="dish__delete-btn"><img src={trash} onClick={() => openDeleteDish(dishObject)}></img></button>
                                <button type='button' className="dish__edit-btn"><img src={edit} onClick={() => openEditDish(dishObject)}></img></button>
                            </div>
                            <h2 className="dish__name">
                                {/* <b>ID: {dishObject.id} | </b> */} 
                                {dishObject.name}
                            </h2>
                            <div className="dish__tags">
                                {dishObject.tags.map(dishTag =>
                                    <div className="dish__tag">{dishTag.name}</div>
                                )}
                            </div>
                        </div>
                    </div>
                ));
                
            });
    }

    useEffect(() => {
         getDishes();
    }, []);
    
    return (
        <div className="page">

            <Modal
                visible={NewDishOpened}
                content={<NewDish closeFunc={closeNewDish} alertDishCreated={alertDishCreated}/>}
                closeFunc={closeNewDish}
            />
            <Modal
                visible={DeleteDishOpened}
                content={<DeleteCard closeFunc={closeDeleteDish} alertDishDeleted={alertDishDeleted} dishId = {dishIdToDel} dishName = {dishNameToDel}/>}
                closeFunc={closeDeleteDish}
            />
            <Modal
                visible={EditDishOpened}
                content={<EditDish closeFunc={closeEditDish} alertDishEdited={alertDishEdited} dishInfo = {dishToEdit}/>}
                closeFunc={closeEditDish}
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
                    {dishes}
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