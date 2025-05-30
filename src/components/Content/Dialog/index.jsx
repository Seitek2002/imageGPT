import { useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
// import chatLogoIcon from '../../../assets/icons/chat-logo.svg';
import texting from '../../../assets/icons/texting-icon.svg';
import fileIcon from '../../../assets/icons/file-icon.svg';

import './style.scss';

const Message = ({ sender, content, files, activeAssistant }) => {
  let parsedText = null;
  let attachmentFiles = null;

  if (content.includes('{')) {
    parsedText = JSON.parse(content).text;
    attachmentFiles = JSON.parse(content).files;
  } else {
    parsedText = content;
    attachmentFiles = files;
  }

  return (
    <div className={`message ${sender}`}>
      {sender === 'assistant' && (
        <img
          src={activeAssistant.photo}
          alt='chat-logo'
          style={{ width: '40px' }}
        />
      )}
      <div className='prose'>
        <ReactMarkdown
          components={{
            img: (props) => {
              return (
                <div className='image-with-download'>
                  <img {...props} alt={props.alt || 'image'} />
                  <a href={props.src} download="image-by-bakaiGPT.jpg" className='download'>
                    Скачать
                  </a>
                </div>
              );
            },
          }}
        >
          {parsedText}
        </ReactMarkdown>
        {attachmentFiles?.length > 0 && (
          <div className='attached-files'>
            {attachmentFiles.map((fileItem, index) => {
              return (
                <div className='uploaded-files__item' key={index}>
                  <img src={fileIcon} alt='file-icon' />
                  <span>{fileItem.filename || 'Безымянный'}</span>
                  {/* при необходимости – ссылка на скачивание
                    <a href={`URL-до-сервера/${fileItem.file_id}`} download>Скачать</a>
                  */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const Dialog = ({ chat, chatLoading, isLoading }) => {
  const chatRef = useRef(null);
  const activeAssistant = useSelector((state) => state.slice.activeAssistant);

  const scrollToBottom = useCallback(() => {
    if (chatRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = chatRef.current;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        chatRef.current.scrollTop = scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat, scrollToBottom, isLoading]);

  return (
    <div
      className='dialog'
      ref={chatRef}
      style={{ alignItems: chat?.length ? 'start' : 'center' }}
    >
      <div className='ss-wrapper'>
        {!chatLoading ? (
          <div className='ask-me'>Задавайте ваш вопрос</div>
        ) : (
          <>
            {Array.isArray(chat) &&
              chat.map((message, index) => {
                const letter = message.content.replace(/【[^】]*】/g, '');
                return (
                  <div key={index}>
                    <Message
                      sender={message.sender}
                      content={letter}
                      activeAssistant={activeAssistant}
                      files={message.files}
                    />
                  </div>
                );
              })}

            {isLoading && (
              <div className='message assistant'>
                <div style={{ width: '27px' }}></div>
                <p className='prose'>
                  <img src={texting} alt='texting' className='texting' />
                </p>
              </div>
            )}
            {chat.length === 0 && <div className='ask-me'></div>}
          </>
        )}
      </div>
    </div>
  );
};

export default Dialog;
