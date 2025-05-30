import { useEffect, useRef, useState, useCallback } from 'react';

export const useChatWebSocket = (chatId, id, hash) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const connectWebSocket = useCallback(() => {
    if (!chatId || !id || !hash) return;

    // Закрываем старый сокет перед открытием нового
    socketRef.current?.close();

    const wsUrl = `wss://bakaigpt.operator.kg/ws/chats/${chatId}/?user_external_id=${id}&hash=${hash}`;
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => console.log('✅ WebSocket подключен');
    ws.onmessage = (event) => {
      if(event.data.includes('{')) {
        JSON.parse(event.data);
      } else {
        handleIncomingMessage(event.data);
      }
    };
    ws.onerror = (error) => console.error('❌ WebSocket Ошибка:', error);
    ws.onclose = () => console.log('🔴 WebSocket закрыт');
  }, [chatId, id, hash]);

  const handleIncomingMessage = useCallback((data) => {
    setMessages((prevMessages) => {
      if (data === '[COMPLETE]') {
        setIsLoading(false);
        return prevMessages;
      }

      const lastMessage = prevMessages[prevMessages.length - 1];

      if (lastMessage?.sender === 'assistant') {
        return prevMessages.map((msg) =>
          msg.id === lastMessage.id
            ? { ...msg, content: msg.content + '' + data }
            : msg
        );
      }

      return [
        ...prevMessages,
        { id: prevMessages.length + 1, sender: 'assistant', content: data },
      ];
    });
  }, []);

  const sendMessage = useCallback((value) => {
    if (!value || !socketRef.current) return;

    socketRef.current.send(value);
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: 'user', content: value },
    ]);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => socketRef.current?.close();
  }, [connectWebSocket]);

  return { messages, isLoading, sendMessage, setMessages };
};
