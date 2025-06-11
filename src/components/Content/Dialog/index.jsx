import { useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
// import chatLogoIcon from '../../../assets/icons/chat-logo.svg';
import texting from '../../../assets/icons/texting-icon.svg';
import fileIcon from '../../../assets/icons/file-icon.svg';

import './style.scss';
import Item from '../../Sidemenu/Mode/Item';

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
                  <a
                    href={props.src}
                    download='image-by-bakaiGPT.jpg'
                    className='download'
                  >
                    <svg
                      id='Capa_1'
                      enable-background='new 0 0 515.283 515.283'
                      height='512'
                      viewBox='0 0 515.283 515.283'
                      width='512'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g>
                        <g>
                          <g>
                            <g>
                              <path
                                d='m400.775 515.283h-286.268c-30.584 0-59.339-11.911-80.968-33.54-21.628-21.626-33.539-50.382-33.539-80.968v-28.628c0-15.811 12.816-28.628 28.627-28.628s28.627 12.817 28.627 28.628v28.628c0 15.293 5.956 29.67 16.768 40.483 10.815 10.814 25.192 16.771 40.485 16.771h286.268c15.292 0 29.669-5.957 40.483-16.771 10.814-10.815 16.771-25.192 16.771-40.483v-28.628c0-15.811 12.816-28.628 28.626-28.628s28.628 12.817 28.628 28.628v28.628c0 30.584-11.911 59.338-33.54 80.968-21.629 21.629-50.384 33.54-80.968 33.54zm-143.134-114.509c-3.96 0-7.73-.804-11.16-2.257-3.2-1.352-6.207-3.316-8.838-5.885-.001-.001-.001-.002-.002-.002-.019-.018-.038-.037-.057-.056-.005-.004-.011-.011-.016-.016-.016-.014-.03-.029-.045-.044-.01-.01-.019-.018-.029-.029-.01-.01-.023-.023-.032-.031-.02-.02-.042-.042-.062-.062l-114.508-114.509c-11.179-11.179-11.179-29.305 0-40.485 11.179-11.179 29.306-11.18 40.485 0l65.638 65.638v-274.409c-.001-15.811 12.815-28.627 28.626-28.627s28.628 12.816 28.628 28.627v274.408l65.637-65.637c11.178-11.179 29.307-11.179 40.485 0 11.179 11.179 11.179 29.306 0 40.485l-114.508 114.507c-.02.02-.042.042-.062.062-.011.01-.023.023-.032.031-.01.011-.019.019-.029.029-.014.016-.03.03-.044.044-.005.005-.012.012-.017.016-.018.019-.037.038-.056.056-.001 0-.001.001-.002.002-.315.307-.634.605-.96.895-2.397 2.138-5.067 3.805-7.89 4.995-.01.004-.018.008-.028.012-.011.004-.02.01-.031.013-3.412 1.437-7.158 2.229-11.091 2.229z'
                                fill='rgb(0,0,0)'
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
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
              // Проверяем, является ли файл изображением по типу или расширению
              const imageExtensions = [
                '.jpg',
                '.jpeg',
                '.png',
                '.gif',
                '.webp',
              ];
              const isImage =
                (fileItem.type && fileItem.type === 'image') ||
                (fileItem.filename &&
                  imageExtensions.some((ext) =>
                    fileItem.filename.toLowerCase().endsWith(ext)
                  ));

              return (
                <div
                  className={isImage ? '' : 'uploaded-files__item'}
                  key={index}
                >
                  {isImage && fileItem.file_url ? (
                    <div className='image-with-download'>
                      <img
                        src={fileItem.file_url}
                        alt={fileItem.filename || 'image'}
                      />
                      <a
                        href={fileItem.file_url}
                        download={fileItem.filename || 'image-by-bakaiGPT.jpg'}
                        className='download'
                      >
                        <svg
                          id='Capa_1'
                          enable-background='new 0 0 515.283 515.283'
                          height='512'
                          viewBox='0 0 515.283 515.283'
                          width='512'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g>
                            <g>
                              <g>
                                <g>
                                  <path
                                    d='m400.775 515.283h-286.268c-30.584 0-59.339-11.911-80.968-33.54-21.628-21.626-33.539-50.382-33.539-80.968v-28.628c0-15.811 12.816-28.628 28.627-28.628s28.627 12.817 28.627 28.628v28.628c0 15.293 5.956 29.67 16.768 40.483 10.815 10.814 25.192 16.771 40.485 16.771h286.268c15.292 0 29.669-5.957 40.483-16.771 10.814-10.815 16.771-25.192 16.771-40.483v-28.628c0-15.811 12.816-28.628 28.626-28.628s28.628 12.817 28.628 28.628v28.628c0 30.584-11.911 59.338-33.54 80.968-21.629 21.629-50.384 33.54-80.968 33.54zm-143.134-114.509c-3.96 0-7.73-.804-11.16-2.257-3.2-1.352-6.207-3.316-8.838-5.885-.001-.001-.001-.002-.002-.002-.019-.018-.038-.037-.057-.056-.005-.004-.011-.011-.016-.016-.016-.014-.03-.029-.045-.044-.01-.01-.019-.018-.029-.029-.01-.01-.023-.023-.032-.031-.02-.02-.042-.042-.062-.062l-114.508-114.509c-11.179-11.179-11.179-29.305 0-40.485 11.179-11.179 29.306-11.18 40.485 0l65.638 65.638v-274.409c-.001-15.811 12.815-28.627 28.626-28.627s28.628 12.816 28.628 28.627v274.408l65.637-65.637c11.178-11.179 29.307-11.179 40.485 0 11.179 11.179 11.179 29.306 0 40.485l-114.508 114.507c-.02.02-.042.042-.062.062-.011.01-.023.023-.032.031-.01.011-.019.019-.029.029-.014.016-.03.03-.044.044-.005.005-.012.012-.017.016-.018.019-.037.038-.056.056-.001 0-.001.001-.002.002-.315.307-.634.605-.96.895-2.397 2.138-5.067 3.805-7.89 4.995-.01.004-.018.008-.028.012-.011.004-.02.01-.031.013-3.412 1.437-7.158 2.229-11.091 2.229z'
                                    fill='rgb(0,0,0)'
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                        Скачать
                      </a>
                    </div>
                  ) : (
                    <>
                      <img src={fileIcon} alt='file-icon' />
                      <span style={{ overflowWrap: 'anywhere' }}>
                        {fileItem.filename || 'Безымянный'}
                      </span>
                    </>
                  )}
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
          <div className='ask-me'>
            <Item
              key={0}
              mode={activeAssistant}
              selectedMode={activeAssistant}
              handleModeChange={() => {}}
            />
            {activeAssistant.greeting ?? (
              <p>{activeAssistant.greeting || 'Задавайте ваш вопрос'}</p>
            )}
          </div>
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
