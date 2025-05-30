import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import Home from './Home'
import NotFound from './NotFound'

const AppRoutes = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const customer_id = searchParams.get('customer_id');
    const hash = searchParams.get('hash');

    if (!customer_id && !hash) {
      navigate('/notFound');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notFound" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes