// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChooseAssistant, toggleBurgerMenu } from '../../store/Slice';

import burger from '../../assets/icons/burger.svg';

import './style.scss';

const Header = ({ handleNotify }) => {
  const dispatch = useDispatch();
  const activeAssistant = useSelector((state) => state.slice.activeAssistant);
  const chooseAssistant = useSelector((state) => state.slice.chooseAssistant);

  const createChat = async () => {
    if (chooseAssistant) {
      dispatch(setChooseAssistant(false));
      handleNotify('Идея успешно создана');
    } else {
      handleNotify('У вас уже есть новая идея');
    }
  };

  return (
    <header className='header'>
      <div className='logo'>
        <img
          src={burger}
          className='burger-menu'
          onClick={() => dispatch(toggleBurgerMenu())}
        />
        <img
          src={activeAssistant.photo}
          alt='logo-icon'
          className='logo-icon'
        />
        <div className='logo-detail'>
          <h2>{activeAssistant.name}</h2>
          <span>Online</span>
        </div>
      </div>
      <div className='plus-wrapper' onClick={createChat}>
        <svg
          width='46'
          height='46'
          viewBox='0 0 46 46'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M23.0002 42.1667C12.4144 42.1667 3.8335 33.5858 3.8335 23C3.8335 12.4143 12.4144 3.83334 23.0002 3.83334C33.5859 3.83334 42.1668 12.4143 42.1668 23C42.1668 33.5858 33.5859 42.1667 23.0002 42.1667ZM21.0835 21.0833H13.4168V24.9167H21.0835V32.5833H24.9168V24.9167H32.5835V21.0833H24.9168V13.4167H21.0835V21.0833Z'
            fill='url(#paint0_linear_16502_339)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_16502_339'
              x1='42.1668'
              y1='3.83333'
              x2='4.78462'
              y2='43.0728'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#46A2F0' />
              <stop offset='1' stopColor='#005CAA' />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </header>
  );
};

export default Header;
