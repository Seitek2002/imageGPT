import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import DeleteModal from '../../DeleteModal';
import { useDeleteChatMutation } from '../../../api/Chats.api';
import {
  setChat,
  setChooseAssistant,
  toggleBurgerMenu,
} from '../../../store/Slice';
import { useSelector } from 'react-redux';

import './style.scss';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return (
    date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) +
    ' ' +
    date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
};

const History = ({ chatsList, dispatch }) => {
  const [modal, setModal] = useState(false);
  const chatId = useSelector((state) => state.slice.chatId);
  const [selectedChatId, setSelectedChatId] = useState(chatId);
  const [deleteChatById] = useDeleteChatMutation();

  const handleClick = async (item) => {
    setSelectedChatId(item.id);
    dispatch(setChat(item.id));
    dispatch(toggleBurgerMenu());
    dispatch(setChooseAssistant(true));
  };

  const onDeleteChat = async () => {
    await deleteChatById(selectedChatId);
    dispatch(setChooseAssistant(false));
    setModal(false);
    toast.success('Идея успешно удалена');
  };

  const openModal = (id) => {
    setSelectedChatId(id);
    setModal(true);
  };

  useEffect(() => {
    if (chatsList?.length === 0) {
      dispatch(setChooseAssistant(false));
    }
  }, [chatsList?.length]);

  return (
    <>
      <div className='tabs-wrapper'>
        <div className='tabs-content'>
          {chatsList?.length ? (
            chatsList.map((item) => {
              return (
                <span
                  className={`tabs-item ${
                    item.id === selectedChatId ? 'active' : ''
                  }`}
                  key={item.id}
                >
                  <span className='tabs-avatar'>
                    <img src={item.assistant.photo} alt='' />
                  </span>
                  <span className='tabs-date'>
                    {formatDate(item.created_at)}
                  </span>

                  <span
                    onClick={() => openModal(item.id)}
                    className='tabs-remove'
                  >
                    <svg
                      width='20'
                      height='21'
                      viewBox='0 0 20 21'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M2 6.427H18V19.427C18 19.6922 17.8946 19.9466 17.7071 20.1341C17.5196 20.3216 17.2652 20.427 17 20.427H3C2.73478 20.427 2.48043 20.3216 2.29289 20.1341C2.10536 19.9466 2 19.6922 2 19.427V6.427ZM4 8.427V18.427H16V8.427H4ZM7 10.427H9V16.427H7V10.427ZM11 10.427H13V16.427H11V10.427ZM5 3.427V1.427C5 1.16179 5.10536 0.907431 5.29289 0.719895C5.48043 0.532359 5.73478 0.427002 6 0.427002H14C14.2652 0.427002 14.5196 0.532359 14.7071 0.719895C14.8946 0.907431 15 1.16179 15 1.427V3.427H20V5.427H0V3.427H5ZM7 2.427V3.427H13V2.427H7Z'
                        fill='#E05A61'
                      />
                    </svg>
                  </span>

                  <span className='tabs-name' onClick={() => handleClick(item)}>
                    {item.name || 'Новая идея'}
                  </span>
                </span>
              );
            })
          ) : (
            <div>Похоже, что у вас пока что не было идей</div>
          )}
        </div>
      </div>

      {modal && (
        <DeleteModal onClose={() => setModal(false)} onDelete={onDeleteChat} />
      )}
    </>
  );
};

export default History;
