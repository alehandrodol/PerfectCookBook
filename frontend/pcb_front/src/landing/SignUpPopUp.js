import './PopUp.css'

export default function SignUpPopUp({closeFunc}) {
    return (
        <aside className='popup popup_type-signUp'>
            <div className='popup__container'>
                <div className='popup__header'>
                    <div className='popup__logo'></div>
                    <h2 className='popup__title'>Название</h2>
                </div>
                <form className='form_type-signUp' name='form'>
                    <input name="login" type="text" placeholder="Логин" className="form__text form__text_type_login" id="login-input" required minLength="2" maxLength="30"></input>
                    <p className='form__caption'>Придумайте логин</p>
                    <input name="password" type="text" placeholder="Пароль" className="form__text form__text_type_password" id="password-input" required minLength="8" maxLength="30"></input>
                    <p className='form__caption'>Пароль должен содержать не менее 6 символов</p>
                    <input name="sampPassword" type="text" placeholder="Повторите пароль" className="form__text form__text_type_samePassword" id="samePassword-input" required minLength="8" maxLength="30"></input>
                    <p className='form__caption'>Повторите пароль</p>
                </form>
                <div className="popup__checkbox">
                    <input type="checkbox" className="checkbox"></input>
                    <label className='popup__caption'>Нажимая кнопку зарегестрироваться, я даю свое согласие на обработку введеной персональной информации.</label>
                    <span></span>
                </div>
                <button className="popup__btn popup__register-btn" type="submit" arial-label="Зарегистрировать">Регистрация</button>
                <button className="popup__cancel-btn" type="button" arial-label="Отменить" onClick = {() => closeFunc()}>Отмена</button>
            </div>
        </aside>
    )}
