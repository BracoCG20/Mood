import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import AdnMood from './pages/AdnMood/AdnMood';
import MoodPrint from './pages/MoodPrint/MoodPrint';

const App = () => {
  return (
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
    </Routes>
  );
};

export default App;
