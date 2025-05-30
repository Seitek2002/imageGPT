import { useEffect } from 'react';

const useAppHeight = () => {
  useEffect(() => {
    const handleViewportResize = () => {
      const height = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${height}px`);
    };

    window.visualViewport?.addEventListener('resize', handleViewportResize);
    handleViewportResize();

    return () => {
      window.visualViewport?.removeEventListener(
        'resize',
        handleViewportResize
      );
    };
  }, []);
};

export default useAppHeight;
