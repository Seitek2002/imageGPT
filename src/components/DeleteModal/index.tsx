import React from 'react';

import close from '../../assets/icons/plus.svg';

import './style.scss';

const DeleteModal = ({ onClose, onDelete }) => {
  return (
    <div className='delete-modal'>
      <div className='delete-modal__bg' onClick={onClose}></div>
      <div className='delete-modal__wrapper'>
        <div className='delete-modal__close'>
          <img
            src={close}
            onClick={onClose}
            alt='close'
            className='delete-modal__close'
          />
        </div>
        <span>
          <svg
            width='47'
            height='47'
            viewBox='0 0 47 47'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='0.5'
              y='0.42688'
              width='46'
              height='46'
              rx='23'
              fill='#E05A61'
            />
            <g clip-path='url(#clip0_15687_42729)'>
              <path
                d='M28.5 17.4269H33.5V19.4269H31.5V32.4269C31.5 32.6921 31.3946 32.9465 31.2071 33.134C31.0196 33.3215 30.7652 33.4269 30.5 33.4269H16.5C16.2348 33.4269 15.9804 33.3215 15.7929 33.134C15.6054 32.9465 15.5 32.6921 15.5 32.4269V19.4269H13.5V17.4269H18.5V14.4269C18.5 14.1617 18.6054 13.9073 18.7929 13.7198C18.9804 13.5322 19.2348 13.4269 19.5 13.4269H27.5C27.7652 13.4269 28.0196 13.5322 28.2071 13.7198C28.3946 13.9073 28.5 14.1617 28.5 14.4269V17.4269ZM29.5 19.4269H17.5V31.4269H29.5V19.4269ZM20.5 22.4269H22.5V28.4269H20.5V22.4269ZM24.5 22.4269H26.5V28.4269H24.5V22.4269ZM20.5 15.4269V17.4269H26.5V15.4269H20.5Z'
                fill='#FCFCFC'
              />
            </g>
            <defs>
              <clipPath id='clip0_15687_42729'>
                <rect
                  width='24'
                  height='24'
                  fill='white'
                  transform='translate(11.5 11.4269)'
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        <h2 className='delete-modal__title'>
          Вы уверены, что хотите удалить идею?
        </h2>
        <h3 className='delete-modal__subtitle'>Идею невозможно восстановить после удаления</h3>
        <div className='delete-modal__btns'>
          <button className='delete-modal__cencell' onClick={onClose}>
            Отмена
          </button>
          <button className='delete-modal__delete' onClick={onDelete}>
          Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
