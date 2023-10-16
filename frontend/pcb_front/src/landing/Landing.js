import starIcon from '../assets/main_page/Star.svg';
import arrow1Icon from '../assets/main_page/arrow1.svg';
import block2Image from '../assets/main_page/block2Image.png';
import appleIcon from '../assets/main_page/appleIcon.svg';
import smileFaceIcon from '../assets/main_page/smileFaceIcon.svg';
import card1 from '../assets/main_page/card1.svg';
import card2 from '../assets/main_page/card2.svg';
import card3 from '../assets/main_page/card3.svg';
import ellipse from '../assets/main_page/Ellipse.svg';
import SingInPopUp from './SignInPopUp'
import SingUpPopUp from './SignUpPopUp'
import './Landing.css';
import { useState } from 'react';

import Modal from './Modal'


function sayHello() {
    alert('You clicked me!');
}

export default function Landing() {

  const [signInOpened, setSignInOpened] = useState(false)
  const closeSignIn = () => {
    setSignInOpened(false)
    document.body.style.overflowY = 'auto';
    document.body.style.marginRight = '0px';
  }
  const openSignIn = () => {
    setSignInOpened(true);
    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = '14.8px';
  }

  const [signUpOpened, setSignUpOpened] = useState(false)
  const closeSignUp = () => {
    setSignUpOpened(false)
    document.body.style.overflowY = 'auto';
    document.body.style.marginRight = '0px';
  }
  const openSignUp = () => {
    setSignUpOpened(true)
    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = '14.8px';
  }



    return (
    <div className='Landing'>
      <Modal
        visible={signInOpened}
        content={<SingInPopUp closeFunc={closeSignIn}/>}
        closeFunc={closeSignIn}
      />
      <Modal
        visible={signUpOpened}
        content={<SingUpPopUp closeFunc={closeSignUp}/>}
        closeFunc={closeSignUp}
      />
      <header className="App-header">
        <div className='headerMain'>
          <div className='logo' onClick={sayHello}>
            <div className='logoSvg'></div>
            <div className='logoTitle'>Название</div>

          </div>
          <div className='signInUp'>
            <button className='ButtonSign' onClick={openSignIn}>Вход</button>
            <button className='ButtonSign regButton' onClick={openSignUp}>Регистрация</button>
          </div>
        </div>
        < div className = 'headerBottomLine' ></div>


      </header>
      <div className="block1">
        <div className='windowContainer'>
          <div className='window'>
            <img src={appleIcon} className="appleIcon"/>
            <img src={smileFaceIcon} className="smileFaceIcon"/>
            <div className='windowHeader'>
              <div className='windowHeaderButton red'></div>
              <div className='windowHeaderButton yellow'></div>
              <div className='windowHeaderButton green'></div>
            </div>
            <div className='windowHeaderLine'></div>
            <div className='windowContent'>
              <div className='windowText'>Хз сюда поместим короче мини копию страницы рецепта или я нарисую иллюстрацию какую нииить</div>
            </div>
          </div>
        </div>

        <div className='welcomeBlock'>
          <img src={starIcon} className="starIcon"/>
          <div className = 'welcomeTitle' >Добро пожаловать<br/>в твою <span className='orange'>идеальную</span> книгу рецептов!</div>
          <div className='welcomeText'>В “название” ты можешь создать свою книгу рецептов, удобную и понятну .......хз че писать</div>
          <div className='createRecipeButton'>Создать рецепт</div>
          
        </div>
      </div>

      <div className='block2'>
        <div className='block2TextContainer'>
          <div className='block2TextTitle'><span className='orange2'>Cобери</span> все любимые блюда в одном месте</div>
          <div className='block2TextText'>Поставь тэги для сортировки ебанись головой об стену<br/>нам нужен маркетолог я не умею писать тексты</div>
          <img src={arrow1Icon} className="arrow1Icon"/>
        </div>
        <img src={block2Image} className="block2Image"/>
      </div>
      <div className='block3'>
        <div className='block3Title'>Как это работает?</div>
        <div className='block3Cards'>
          <div className='card'>
            <img className='card__picture' src={card1}></img>
            <div className='card__text'>
              <h2 className='card__name'>Создавай</h2>
              <p className='card__description'>На нашем сайте ты можешь создать блюдо, а потом создать для него несколько вариаций рецептов.</p>
            </div>
          </div>
          <div className='card'>
            <img className='card__picture' src={card2}></img>
            <div className='card__text'>
              <h2 className='card__name'>Оценивай</h2>
              <p className='card__description'>Ты можешь поставить каждому рецепту и блюду оценку, что позволяет быстро находить самую удачную версию и не повторять ошибок.</p>
            </div>
          </div>
          <div className='card'>
            <img className='card__picture' src={card3}></img>
            <div className='card__text'>
              <h2 className='card__name'>Сортируй</h2>
              <p className='card__description'>Для того, чтобы не запутаться в многообразии блюд и рецептов, ты можешь сортировать их по своим оценкам и различным тэгам.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='block4'>
          <button type='button' className='block4__try-btn' aria-label='Попробовать' onClick={openSignUp}>Попробовать&#9658;</button>
      </div>
      
      <footer className='footer'>
        <div className = 'headerBottomLine'></div>
        <p className='footer__text'>©,2023️</p>
      </footer>
    </div>

  );
}