import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import AdnMood from './pages/AdnMood/AdnMood';
import MoodPrint from './pages/MoodPrint/MoodPrint';
import Contact from './pages/Contact/Contact';

const App = () => {
  return (
    <>
      {/* ScrollToTop funciona perfecto aquí porque App ya está envuelto por BrowserRouter en main.jsx */}
      <ScrollToTop />

      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/adn-mood'
          element={<AdnMood />}
        />
        <Route
          path='/mood-print'
          element={<MoodPrint />}
        />
        <Route
          path='/contacto'
          element={<Contact />}
        />
      </Routes>
    </>
  );
};

export default App;
