import "./NewRecipe.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import logOut from '../assets/dishes/logOut.svg';
import save from '../assets/dishes/save.svg';
import Modal from "../landing/Modal";
import NewTag from "../dishes/NewTag";
import { useLocation } from "react-router";
import config from '../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



let createRecipe = async (dish_id, name, description, flow, rating, times, tags, ingredients) => {
    let success = false
    if (name.length < 3) {
        toast.error('Слишком короткое название');
        return success
    }
    let error = false;
    ingredients.forEach(function (item, index) {
        if (item[0].length < 3) {
            toast.error('Слишком короткое название ингредиента '+ item[0]);
            error = true
        }
        if (item.length < 2 && !error) {
            toast.error('Укажите количество ингредиента ' + item[0]);
            error = true
        }
    });
    if (error) return success;
    let newRecipe = {
        "dish_id": dish_id,
        "image_url": "string",
        "name": name,
        "description": JSON.stringify({
            time_cook: times[2],
            portions: times[1],
            time_prep: times[0],
            description: description
        }),
        "cooking_flow": flow,
        "rating": rating,
        "cooked_times": 0,
        'tags': tags.map((x) => ({
            name: x
        })),
        "ingredients": ingredients.map((x) => ({
            name: x[0],
            quantity: x[1],
            comment: ''
        }))
    };
    const createRecipeRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(newRecipe)
    };
    await fetch(config.backend + '/recipes/create/', createRecipeRequest)
        .then(response => response.json())
        .then(data => {
            if (data.name == name) {
                success = true
            }
        });
    return success
}












export default function NewRecipe() {
    let locationData = useLocation();
    const dish_id = locationData.state.dishId;

    const [inputName, setInputName] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [inputFlow, setInputFlow] = useState('');
    const [inputIngredients, setInputIngredients] = useState('');
    const [inputTimeCook, setInputTimeCook] = useState('');
    const [inputTimePrep, setInputTimePrep] = useState('');
    const [inputPortions, setInputPortions] = useState('');
    const [newTags, setNewTags] = useState([]);

    let times = () => {
        return [inputTimePrep, inputPortions, inputTimeCook]
    }

    let newIngredients = (ingredients) => {
        let ing = ingredients.split(/\r?\n/).map((x) => (x.split(' ')));
        return ing;
    }

    const navigate = useNavigate();

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
        <div className="page">

            <Modal
                visible={NewTagOpened}
                content={<NewTag closeFunc={closeNewTag} updateNewTags={updateNewTags}/>}
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
                        <Link className="header__recipe" to="/recipes" state={{ dishId: locationData.state.dishId}}><p className="header__text">Рецепты</p></Link>
                        <button className='header__btn-exit'><img src={logOut} onClick={() => {localStorage.removeItem('access_token'); navigate("/");}}></img></button>
                    </div>
                </div>
                <div className = 'header__line'></div>
            </header>

            <div className="content">
                <div className="newRecipe">
                    <input type="text" placeholder="Введите название рецепта" className="newRecipe__title"   value={inputName} onInput={e => setInputName(e.target.value)}></input>
                    <div className="newRecipe__caption">
                        < p className = "newRecipe__preparation-time newRecipe__preparation__inps" > Время подготовлений: <input type="text" placeholder="" className="newRecipe__preparation__input" value={inputTimePrep} onInput={e => setInputTimePrep(e.target.value)}></input ></p>
                        <p className="newRecipe__portions newRecipe__preparation__inps">Порции: <input type="text" placeholder="" className="newRecipe__preparation__input" value={inputPortions} onInput={e => setInputPortions(e.target.value)}></input ></p>
                        <p className="newRecipe__cooking-time newRecipe__preparation__inps">Время приготовления: <input type="text" placeholder="" className="newRecipe__preparation__input" value={inputTimeCook} onInput={e => setInputTimeCook(e.target.value)}></input ></p>
                    </div>
                    <div className="newRecipe__img-frame">
                        <label className="newRecipe__input-imgContainer">
                            <input type='file' className="newRecipe__input-img"></input>
                        </label>
                        <button className="newRecipe__save-btn"
                        onClick={() => createRecipe(dish_id, inputName, inputDescription, inputFlow, 0, times(), newTags, newIngredients(inputIngredients)).then(success => {if(success) {navigate("/recipes", {state: {dishId: dish_id, newRecipe:inputName}})}})}><img className="save-img" src={save}></img></button>
                    </div>
                    <div className="newRecipe__description">
                        <h2 className="newRecipe__description-title">Описание рецепта:</h2>
                        <textarea type='text' placeholder="Введите описание рецепта..." className="newRecipe__input-description"  value={inputDescription} onInput={e => setInputDescription(e.target.value)}></textarea>
                    </div>
                    <ol className="newRecipe__ingredients">
                        <h2 className="newRecipe__ingredients-title">Ингридиенты:</h2>
                        <textarea type='text' placeholder="Введите название ингредиента..." className="newRecipe__input-ingredient" value={inputIngredients} onInput={e => setInputIngredients(e.target.value)}></textarea>
                    </ol>
                    <div className="newRecipe__recipe">
                        <h2 className="newRecipe__recipe-title">Рецепт:</h2>
                        <textarea type='text' placeholder="Введите рецепт..." className="newRecipe__input-recipe"  value={inputFlow} onInput={e => setInputFlow(e.target.value)}></textarea>
                    </div>
                    <h1 className="newRecipe__tag-title">Добаьвте тег</h1>
                    
                    <div className="newRecipe__tags">
                        {newTags.map(newTag => <div className="newRecipe__tags__tag">{newTag}</div>)}
                        {newTags.length < 4 ? <button type="button" className="newRecipe__add-tag" onClick={openNewTag}></button>: null}
                    </div>
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