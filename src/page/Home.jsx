import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { usePostUsersMutation } from '../api/User.api';
import { useSearchParams } from 'react-router-dom';
import useAppHeight from '../hooks/useAppHeight';
import { useDispatch } from 'react-redux';
import Content from '../components/Content';
import Header from '../components/Header';
import Sidemenu from '../components/Sidemenu';

import loader from '../assets/loader.svg';

const Home = () => {
  const [searchParams] = useSearchParams();
  useAppHeight();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [postUser] = usePostUsersMutation();

  useEffect(() => {
    const id = searchParams.get('customer_id');
    const hash = searchParams.get('hash');
    const storage = JSON.parse(localStorage.getItem('bakaiGPT_sha265')) || {};

    if (!storage?.id) {
      localStorage.setItem('bakaiGPT_sha265', JSON.stringify({ id, hash }));

      setUserData({ id, hash });

      try {
        postUser({ id });
        setUserData({ id: storage.id, hash: storage.hash });
      } catch (error) {
        setUserData({ id: storage.id, hash: storage.hash });
      }
    }

    setUserData({ id: storage.id, hash: storage.hash });
  }, [dispatch, postUser]);

  if (!userData) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <img style={{ maxWidth: '100px' }} src={loader} alt='' />
      </div>
    );
  }

  const handleNotify = (text) => {
    toast.success(text, { duration: 2000 });
  };

  return (
    <>
      <div className='wrapper'>
        <Sidemenu />
        <div className='main'>
          <Header handleNotify={handleNotify} />
          <Toaster
            position='bottom-left'
            containerStyle={{
              position: 'absolute',
              width: window.innerWidth < 768 ? '100%' : '100%',
              margin: '0 auto',
              bottom: '100px',
              left: window.innerWidth < 768 ? '0px' : '50px',
            }}
            toastOptions={{
              style: {
                justifyContent: 'start',
              },
            }}
          />
          <Content />
        </div>
      </div>
    </>
  );
};

export default Home;
