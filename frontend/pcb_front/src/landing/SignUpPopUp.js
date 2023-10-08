import './PopUp.css'

export default function SignUpPopUp({closeFunc}) {
    return (
        <div className="popUpLayout">
            <div className='popUpWindow'>
                Попап с регистрацией
                <button onClick = {() => closeFunc()}>Закрыть</button>
            </div>
        </div>

    )}