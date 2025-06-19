import { useEffect, useRef, useState, useCallback } from 'react';

export const useChatWebSocket = (chatId, id, hash) => {
  const socketRef = useRef(null);

  // Хранит сообщения для UI
  const [messages, setMessages] = useState([]);
  
  // Флаг загрузки ответа ассистента
  const [isLoading, setIsLoading] = useState(false);
  
  // Очередь сообщений, ожидающих отправки
  const [queuedMessages, setQueuedMessages] = useState([]);

  // Подключение WebSocket
  const connectWebSocket = useCallback(() => {
    if (!chatId || !id || !hash) return;

    // Закрываем предыдущий сокет
    socketRef.current?.close();

    // Создаём новый WebSocket
    const wsUrl = `wss://imagegpt.operator.kg/ws/chats/${chatId}/?user_external_id=${id}&hash=${hash}`;
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    // Обработчик открытия соединения
    ws.onopen = () => {
      console.log('✅ WebSocket подключен');
      
      // Отправляем сообщения из очереди
      setQueuedMessages((prevQueue) => {
        prevQueue.forEach((queuedMsg) => ws.send(queuedMsg));
        return [];
      });
    };

    // Обработчик входящих сообщений
    ws.onmessage = (event) => {
      if (event.data.includes('{')) {
        try {
          const parsedData = JSON.parse(event.data);
          // Добавить логику обработки JSON, если требуется
        } catch (e) {
          console.error('Ошибка при парсинге JSON:', e);
        }
      } else {
        handleIncomingMessage(event.data);
      }
    };

    // Обработчик ошибок
    ws.onerror = (error) => console.error('❌ WebSocket Ошибка:', error);

    // Обработчик закрытия соединения
    ws.onclose = () => console.log('🔴 WebSocket закрыт');
  }, [chatId, id, hash]);

  // Обработка входящих сообщений
  const handleIncomingMessage = useCallback((data) => {
    setMessages((prevMessages) => {
      if (data === '[COMPLETE]') {
        setIsLoading(false);
        return prevMessages;
      }
      
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage?.sender === 'assistant') {
        // Дополняем последнее сообщение ассистента
        return prevMessages.map((msg) =>
          msg.id === lastMessage.id
            ? { ...msg, content: msg.content + data }
            : msg
        );
      }
      // Добавляем новое сообщение ассистента
      return [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: 'assistant',
          content: data,
        },
      ];
    });
  }, []);

  // Отправка сообщения
  const sendMessage = useCallback((value) => {
    if (!value || !socketRef.current) return;

    // Добавляем сообщение пользователя в UI
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: 'user', content: value },
    ]);
    setIsLoading(true);

    // Проверяем состояние сокета
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(value);
    } else {
      setQueuedMessages((prevQueue) => [...prevQueue, value]);
    }
  }, []);

  // Инициализация и очистка WebSocket
  useEffect(() => {
    connectWebSocket();
    return () => socketRef.current?.close();
  }, [connectWebSocket]);

  return {
    messages,
    isLoading,
    sendMessage,
    setMessages,
  };
};