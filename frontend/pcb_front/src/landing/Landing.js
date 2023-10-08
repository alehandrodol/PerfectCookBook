import starIcon from '../assets/main_page/Star.svg';
import arrow1Icon from '../assets/main_page/arrow1.svg';
import block2Image from '../assets/main_page/block2Image.png';
import appleIcon from '../assets/main_page/appleIcon.svg';
import smileFaceIcon from '../assets/main_page/smileFaceIcon.svg';
import './Landing.css';


function sayHello() {
    alert('You clicked me!');
}

export default function Landing() {
    return (
    <div className='Landing'>
      <header className="App-header">
        <div className='headerMain'>
          <div className='logo' onClick={sayHello}>
            <div className='logoSvg'></div>
            <div className='logoTitle'>Название</div>

          </div>
          <div className='signInUp'>
            <button className='ButtonSign' onClick={sayHello}>Вход</button>
            <button className='ButtonSign regButton' onClick={sayHello}>Регистрация</button>
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
        <div className='block3Title'>Причины пользования</div>
        <div className='block3Cards'>
          <div className='card'>Текст
            <div className=' card cardBackground'></div>
          </div>
          <div className='card yellowCard'>Текст
            <div className=' card cardBackground yellowCardBack'></div>
          </div>
          <div className='card orangeCard'>Текст
            <div className=' card cardBackground orangeCardBack'></div>
          </div>
          <div className='card redCard'>Текст
            <div className=' card cardBackground redCardBack'></div>
          </div>
        </div>
      </div>
      <div className='block4'>
        block4
      </div>
    </div>

  );
}