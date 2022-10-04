import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlayWithFriend from './pages/PlayWithFriend/PlayWithFriend';
import Playground from './pages/Playground/Playground';
import CreateGame from './pages/CreateGame/CreateGame';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/playwithfriend" element={<PlayWithFriend />} />
      </Routes>
      <Routes>
        <Route path="/creategame" element={<CreateGame />} />
      </Routes>
      <Routes>
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </Router>
  );
}
