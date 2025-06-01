import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBurgerMenu } from '../../store/Slice';
import { useGetAssistantsQuery } from '../../api/Assistants.api';
import AssistantSkeleton from '../../skeletons/AssistantSkeleton';
import { useGetChatsQuery } from '../../api/Chats.api';

import accountIcon from '../../assets/icons/account.svg';
import burgerArrow from '../../assets/icons/burger-arrow.svg';

import Segments from './Segments';
import History from './History';
import Mode from './Mode';

import './style.scss';

const Sidemenu = () => {
  const dispatch = useDispatch();
  const { data: assistantsList, isLoading, error } = useGetAssistantsQuery();
  const { data: chatsList } = useGetChatsQuery();
  const [activeSegment, setActiveSegment] = useState('consultant');
  const burgerMenu = useSelector((state) => state.slice.burgerMenuOpen);

  return (
    <>
      <div
        className={`side-close-bg ${burgerMenu ? '' : 'open'}`}
        onClick={() => dispatch(toggleBurgerMenu())}
      ></div>
      <div className={`side-menu ${burgerMenu ? '' : 'open'}`}>
        <div className='side-header'>
          <img src='/imagegpt.png' alt='' className='logo' />
          {/* <h1>BakaiGPT</h1> */}
          {window.innerWidth <= 769 ? (
            <img src={burgerArrow} onClick={() => dispatch(toggleBurgerMenu())} className='burger-icon' />
          ) : (
            <div></div>
          )}
        </div>
        <Segments
          setActiveSegment={setActiveSegment}
          activeSegment={activeSegment}
        />
        <div className='side-menu__modes modes'>
          <div>
            {activeSegment === 'history' && (
              <History dispatch={dispatch} chatsList={chatsList} />
            )}
            {activeSegment === 'consultant' && (
              <>

                {isLoading ? (
                  <>
                    <AssistantSkeleton
                      style={{ width: '100%', height: '80px' }}
                    />
                    <AssistantSkeleton
                      style={{ width: '100%', height: '80px' }}
                    />
                    <AssistantSkeleton
                      style={{ width: '100%', height: '80px' }}
                    />
                    <AssistantSkeleton
                      style={{ width: '100%', height: '80px' }}
                    />
                  </>
                ) : error ? (
                  <p>Ошибка загрузки ассистентов. Попробуйте позже.</p>
                ) : (
                  <Mode dispatch={dispatch} assistantsList={assistantsList} />
                )}
              </>
            )}
          </div>
        </div>

        <div className='right'>
          <div className='acc'>
            <img src={accountIcon} alt='account-icon' />
            Тестовый Пользователь
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidemenu;
