import './PopUp.css'

export default function SignInPopUp({closeFunc}) {
    return (
        <div className="popUpLayout">
            <div className='popUpWindow'>
                Попап с входом
                <button onClick = {() => closeFunc()}>Закрыть</button>
            </div>
        </div>

    )}