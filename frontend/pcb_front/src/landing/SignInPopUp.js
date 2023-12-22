import './PopUp.css'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json';
import { useNavigate } from "react-router-dom";

export let signIn = async (login, password) => {
    let success = false
    if (login == '' || password == ''){
        toast.error('Введите логин и пароль');
        return success
    }
    const loginRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'username': login,
            'password': password
        })
    };
    await fetch(config.backend + '/auth/token', loginRequest)
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                success = true;
            }
            else toast.error('Неверный логин или пароль');
        });
    return success

}

export default function SignInPopUp({closeFunc}) {
    const [inputLogin, setInputLogin] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const navigate = useNavigate();

    return (
        <aside className='popup popup_type-signIn'>
            <div className='popup__container'>
                <div className='popup__header'>
                    <div className='popup__logo'></div>
                    <h2 className='popup__title'>Название</h2>
                </div>
                <form className='form form_type-signIn' name='form'>
                    <input name="login" type="text" placeholder="Логин" className="form__text form__text_type_login" id="login-input" required minLength="2" maxLength="30" value={inputLogin} onInput={e => setInputLogin(e.target.value)}></input>
                    <p className='form__caption'>Введите логин</p>
                    <input name="password" type="password" placeholder="Пароль" className="form__text form__text_type_password" id="password-input" required minLength="8" maxLength="30" value={inputPassword} onInput={e => setInputPassword(e.target.value)}></input>
                    <p className='form__caption'>Введите пароль</p>
                </form>
                <button className="popup__btn popup__enter-btn" type="submit" arial-label="Войти" onClick = {() => signIn(inputLogin, inputPassword).then(success => {if(success) {closeFunc(); navigate("/dishes")}})}>Войти</button>
                <button className="popup__cancel-btn" type="button" arial-label="Отмена" onClick = {() => closeFunc()}>Отмена</button>
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