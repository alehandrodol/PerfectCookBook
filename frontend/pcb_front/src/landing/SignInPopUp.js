import './PopUp.css'

export default function SignInPopUp({closeFunc}) {
    return (
        <aside className='popup popup_type-signIn'>
            <div className='popup__container'>
                <div className='popup__header'>
                    <div className='popup__logo'></div>
                    <h2 className='popup__title'>Название</h2>
                </div>
                <form className='form_type-signIn' name='form'>
                    <input name="login" type="text" placeholder="Логин" className="form__text form__text_type_login" id="login-input" required minLength="2" maxLength="30"></input>
                    <span></span>
                    <input name="password" type="text" placeholder="Пароль" className="form__text form__text_type_password" id="password-input" required minLength="8" maxLength="30"></input>
                    <span></span>
                </form>
                <button className="popup__btn popup__enter-btn" type="submit" arial-label="Войти">Войти</button>
                <button className="popup__cancel-btn" type="button" arial-label="Отмена" onClick = {() => closeFunc()}>Отмена</button>
            </div>
        </aside>

    )}