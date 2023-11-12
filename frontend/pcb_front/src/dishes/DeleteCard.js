import "./DeleteCard.css";
import trash from "../assets/dishes/trash.svg";

export default function DeleteCard({closeFunc}) {
    return (
        <div className=" popup delete-card">
            <form className="delete-card__form">
                <img src={trash} className="delete-card__img"></img>
                <div className="delete-card__title">Вы уверены, что хотите удалить блюдо?</div>
                <div className="delete-card__buttons">
                    <button type="submit" className="delete-card__submit-btn">Удалить</button>
                    <button type="button" className="delete-card__leave-btn" onClick={closeFunc}>Отмена</button>
                </div>
            </form>
        </div>
    )
}