import { Route, Routes } from 'react-router-dom';
import Weather from './components/Weather';
import './index.css';
import FavWeathers from './pages/FavWeathers';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Weather />} />
      <Route path="/favourite-weather" element={<FavWeathers />} />
    </Routes>
  );
};

export default App;
