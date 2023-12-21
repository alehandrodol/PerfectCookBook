import './PopUp.css'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json';
import logo from '../assets/main_page/logo.svg';
import { useNavigate } from "react-router-dom";
import { signIn } from './SignInPopUp'

let signUp = async (login, password, passwordRepeat, agreeToTerms) => {
    let success = false
    let registered = false
    if (login.length < 3){
        toast.error('Слишком короткий логин');
        return success
    }
    if (password.length < 8) {
        toast.error('Слишком короткий пароль');
        return success
    }
    if (password != passwordRepeat) {
        toast.error('Пароли не совпадают');
        return success
    }
    if (!agreeToTerms) {
        toast.error('Необходимо согласиться с условиями');
        return success
    }
    const registerRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'login': login,
            'password': password
        })
    };
    await fetch(config.backend + '/register/', registerRequest)
        .then(response => response.json())
        .then(data => {
            if (data.detail == 'User already exists') {
                toast.error('Имя пользователя занято');
                return success
            }
            else if (data.login == login) {
                registered = true
            }
            else if (data.detail[0].msg == 'Value error, must contain at least one special character') {
                toast.error('Пароль должен содержать хотя бы один специальный символ');
                return success
            }
            else if (data.detail[0].msg == 'Value error, must contain at least one lowercase letter') {
                toast.error('Пароль должен содержать хотя бы одну строчную букву');
                return success
            }
            else if (data.detail[0].msg == 'Value error, must contain at least one uppercase letter') {
                toast.error('Пароль должен содержать хотя бы одну заглавную букву');
                return success
            }
            else if (data.detail[0].msg == 'Value error, must contain at least one digit') {
                toast.error('Пароль должен содержать хотя бы одну цифру');
                return success
            }
            
        });
    if (registered) {
        await signIn(login, password).then(successLogin => {
            console.log(successLogin, 1)
            success = true
        })
    }
    return success

}

export default function SignUpPopUp({closeFunc}) {

    const [inputLogin, setInputLogin] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputPasswordRepeat, setInputPasswordRepeat] = useState('');
    const [inputAgreeToTerms, setInputAgreeToTerms] = useState(false);
    const navigate = useNavigate();

    return (
        <aside className='popup popup_type-signUp'>
            <div className='popup__container'>
                <div className='popup__header'>
                    <img src={logo} alt="logo" className='popup__logo'></img>
                    <h2 className='popup__title'>RecipeBook+</h2>
                </div>
                <form className='form_type-signUp' name='form'>
                    <input name="login" type="text" placeholder="Логин" className="form__text form__text_type_login" id="login-input" required minLength="2" maxLength="30" value={inputLogin} onInput={e => setInputLogin(e.target.value)}></input>
                    <p className='form__caption'>Придумайте логин</p>
                    <input name="password" type="password" placeholder="Пароль" className="form__text form__text_type_password" id="password-input" required minLength="8" maxLength="30" value={inputPassword} onInput={e => setInputPassword(e.target.value)}></input>
                    <p className='form__caption'>Пароль должен содержать не менее 6 символов</p>
                    <input name="sampPassword" type="password" placeholder="Повторите пароль" className="form__text form__text_type_samePassword" id="samePassword-input" required minLength="8" maxLength="30" value={inputPasswordRepeat} onInput={e => setInputPasswordRepeat(e.target.value)}></input>
                    <p className='form__caption'>Повторите пароль</p>
                </form>
                <div className="popup__checkbox">
                    <input type="checkbox" className="checkbox" checked={inputAgreeToTerms} onChange={() => setInputAgreeToTerms(!inputAgreeToTerms)}></input>
                    <label className='popup__caption'>Я даю свое согласие на обработку введеной персональной информации.</label>
                    <span></span>
                </div>
                <button className="popup__btn popup__register-btn" type="submit" arial-label="Зарегистрировать" onClick = {() => signUp(inputLogin, inputPassword, inputPasswordRepeat, inputAgreeToTerms).then(success => {if(success) {closeFunc(); navigate("/dishes")}})}>Регистрация</button>
                <button className="popup__cancel-btn" type="button" arial-label="Отменить" onClick = {() => closeFunc()}>Отмена</button>
            </div>
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
        </aside>
    )}
