import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}
export default App;
