import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetChatByIdQuery } from '../../api/Chats.api';
import { setActiveAssistant } from '../../store/Slice';
import { useChatWebSocket } from '../../hooks/useChatWebSocket';
import Dialog from './Dialog';
import Letter from './Letter';

import './style.scss';

const Content = () => {
  const { id, hash } = JSON.parse(localStorage.getItem('bakaiGPT_sha265'));
  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.slice.chatId);
  const chooseAssistant = useSelector((state) => state.slice.chooseAssistant);
  const [fetchChat] = useLazyGetChatByIdQuery();
  const { messages, isLoading, sendMessage, setMessages } = useChatWebSocket(
    chatId,
    id,
    hash
  );

  const fetchChatData = async () => {
    try {
      const { data } = await fetchChat(chatId);
      setMessages(data.messages);
      if (data?.assistant) dispatch(setActiveAssistant(data.assistant));
    } catch (error) {
      console.error('Ошибка загрузки чата:', error);
    }
  };

  useEffect(() => {
    if (!chatId) return;

    fetchChatData();
  }, [chatId, dispatch]);

  return (
    <div className='content'>
      <Dialog
        chat={messages}
        chatLoading={chooseAssistant}
        isLoading={isLoading}
      />
      <Letter
        isLoading={isLoading}
        chatLoading={chooseAssistant}
        sendMessages={sendMessage}
        setMessages={setMessages}
      />
    </div>
  );
};

export default Content;
