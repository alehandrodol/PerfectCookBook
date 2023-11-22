import "./DeleteCard.css";
import trash from "../assets/dishes/trash.svg";
import config from '../config.json';



let deleteDish = async (dishId) => {
    let success = false
    const deleteDishRequest = {
        method: 'DELETE',
        headers: {
            'accept': '*/*',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    };
    await fetch(config.backend + '/dishes/' + dishId, deleteDishRequest)
        .then(response => response.status)
        .then(data => {
            if (data == 204) {
                success = true
            }
        });
    return success
}


export default function DeleteCard({closeFunc, alertDishDeleted, dishId, dishName}) {
    return (
        <div className=" popup delete-card">
            <form className="delete-card__form">
                <img src={trash} className="delete-card__img"></img>
                <div className="delete-card__title">Вы уверены, что хотите удалить блюдо?</div>
                <div className="delete-card__buttons">
                    <button type="button" className="delete-card__submit-btn" onClick={() => deleteDish(dishId).then(success => {if(success) {closeFunc(); alertDishDeleted(dishName)}})}>Удалить</button>
                    <button type="button" className="delete-card__leave-btn" onClick={closeFunc}>Отмена</button>
                </div>
            </form>
        </div>
    )
}