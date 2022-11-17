import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ServiceContext, { RoshambooService } from 'main/service';
import Home from './pages/Home/Home';
import PlayWithFriend from './pages/PlayWithFriend/PlayWithFriend';
import Playground from './pages/Playground/Playground';
import CreateGame from './pages/CreateGame/CreateGame';
import WaitingLobby from './pages/WaitingLobby/WaitingLobby';
import PlayerLeft from './pages/PlayerLeft/PlayerLeft';
import './App.css';

export default function App() {
  const onSocketConnected = (sid: string) => console.log(sid);
  const service: RoshambooService = new RoshambooService(onSocketConnected);

  return (
    <ServiceContext.Provider value={{ service }}>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/playwithfriend" element={<PlayWithFriend />} />
          <Route path="/creategame" element={<CreateGame />} />
          <Route path="/waitinglobby" element={<WaitingLobby />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/playerleft" element={<PlayerLeft />} />
        </Routes>
      </Router>
    </ServiceContext.Provider>
  );
}
