import "../dishes/DeleteCard.css";
import trash from "../assets/dishes/trash.svg";
import config from '../config.json';



let deleteRecipe = async (recipeId) => {
    let success = false
    const deleteRecipeRequest = {
        method: 'DELETE',
        headers: {
            'accept': '*/*',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    };
    await fetch(config.backend + '/recipes/' + recipeId, deleteRecipeRequest)
        .then(response => response.status)
        .then(data => {
            if (data == 204) {
                success = true
            }
        });
    return success
}


export default function DeleteCard({closeFunc, alertRecipeDeleted, recipeId, recipeName}) {
    return (
        <div className=" popup delete-card">
            <form className="delete-card__form">
                <img src={trash} className="delete-card__img"></img>
                <div className="delete-card__title">Вы уверены, что хотите удалить рецепт?</div>
                <div className="delete-card__buttons">
                    <button type="button" className="delete-card__submit-btn" onClick={() => deleteRecipe(recipeId).then(success => {if(success) {closeFunc(); alertRecipeDeleted(recipeName)}})}>Удалить</button>
                    <button type="button" className="delete-card__leave-btn" onClick={closeFunc}>Отмена</button>
                </div>
            </form>
        </div>
    )
}