import { useEffect, useRef, useState } from 'react';
import {
  useLazyGetChatsQuery,
  usePostChatMutation,
  useUploadFileMutation,
} from '../../../api/Chats.api';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setChat, setChooseAssistant } from '../../../store/Slice';

import uploadFileIcon from '../../../assets/icons/upload-file.svg';
import sendIcon from '../../../assets/icons/send.svg';
import texting from '../../../assets/icons/texting-icon.svg';
import fileIcon from '../../../assets/icons/file-icon.svg';

import './style.scss';

const Letter = ({ isLoading, chatLoading, sendMessages, setMessages }) => {
  const dispatch = useDispatch();
  const [getChats] = useLazyGetChatsQuery();
  const [postChat] = usePostChatMutation();
  const activeAssistant = useSelector((state) => state.slice.activeAssistant);
  const [value, setValue] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadFile] = useUploadFileMutation();
  const textareaRef = useRef(null);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleDelay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const messageData = {
          text: value.trim(),
          files: uploadedFiles.map((f) => ({
            type: f.type || 'file',
            file_id: f.file_id,
            filename: f.filename,
          })),
        };
        console.log(messageData);
        sendMessages(JSON.stringify(messageData));
        resolve();
      }, 700);
    });
  };

  const sendMessage = async () => {
    if (isFileUploading) {
      toast.error('Подождите окончания загрузки файлов');
      return;
    }

    const trimmedMessage = value.trim();
    if (!trimmedMessage) return;

    setValue('');

    if (chatLoading) {
      const messageData = {
        text: trimmedMessage,
        files: uploadedFiles.map((f) => ({
          type: f.type || 'file',
          file_id: f.file_id,
          filename: f.filename,
        })),        
      };
      sendMessages(JSON.stringify(messageData));
      setUploadedFiles([]);
      return;
    }

    try {
      setMessages([{ sender: 'user', content: trimmedMessage }]);
      dispatch(setChooseAssistant(true));

      setValue('');
      const { data } = await postChat({ id: activeAssistant.id });
      dispatch(setChat(data.id));

      await toast.promise(handleDelay(), {
        loading: 'Создается новая идея...',
        success: 'Новая идея создана!',
        error: 'Ошибка при создании идеи.',
      });

      getChats();
      setUploadedFiles([]);
    } catch (error) {
      console.error('Ошибка при создании идеи:', error);
      toast.error('Не удалось создать новую идею.');
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '20px';
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight - 40
      }px`;
    }
  }, [value]);

  const onFocus = () => {
    setTimeout(() => {
      textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 300);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    const toastId = toast.loading('Загрузка файлов…');

    if (files.length > 0) {
      setIsFileUploading(true);

      for (const file of files) {
        try {
          const response = await uploadFile(file).unwrap();

          // Определяем тип
          const imageExtensions = [
            '.jpg',
            '.jpeg',
            '.png',
            '.gif',
            '.bmp',
            '.webp',
            '.svg',
          ];
          const isImage = imageExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext)
          );

          setUploadedFiles((prev) => [
            ...prev,
            {
              file_id: response.file_id,
              filename: file.name,
              type: isImage ? 'image' : 'file',
            },
          ]);
        } catch (error) {
          console.error('Ошибка при загрузке файла:', error);
          toast.error('Не удалось загрузить файл', { id: toastId });
          setIsFileUploading(false);
        }
      }
    }

    e.target.value = null;

    toast.success('Файлы загружены!', { id: toastId });
    setIsFileUploading(false);
  };

  const handleRemoveFile = (indexToRemove) => {
    setUploadedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      {uploadedFiles.length > 0 && (
        <div className='uploaded-files'>
          {uploadedFiles.map((file, index) => (
            <div className='uploaded-files__item' key={index}>
              <img src={fileIcon} alt='file-icon' />
              <span>{file.filename}</span>
              <button
                className='uploaded-files__item-remove'
                onClick={() => handleRemoveFile(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className='letter'>
        <label htmlFor='file'>
          <img src={uploadFileIcon} alt='upload-file-icon' />
          <input
            type='file'
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id='file'
          />
        </label>
        <textarea
          ref={textareaRef}
          id='letter'
          value={value}
          type='text'
          placeholder='Ваш вопрос...'
          onFocus={onFocus}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && e.shiftKey === false) {
              sendMessage();
            }
          }}
        ></textarea>
        {isLoading ? (
          <img src={texting} alt='texting' className='texting' />
        ) : (
          <img
            src={sendIcon}
            alt='send-icon'
            onClick={() => {
              if (!isFileUploading) {
                sendMessage();
              } else {
                toast.error('Подождите окончания загрузки файлов');
              }
            }}
            style={{
              opacity: isFileUploading ? 0.5 : 1,
              cursor: isFileUploading ? 'not-allowed' : 'pointer',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Letter;
