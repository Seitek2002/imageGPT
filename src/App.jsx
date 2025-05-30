import { BrowserRouter, useParams } from 'react-router-dom';

import './App.scss';
import AppRoutes from './page/router';

function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
