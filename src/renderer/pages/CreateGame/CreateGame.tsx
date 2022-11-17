import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from 'main/service';
import './creategame.css';

export default function CreateGame() {
  const navigate = useNavigate();
  const rs = useContext(ServiceContext);
  const [rounds, setRounds] = useState(5);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRounds(parseInt(event.target.value, 10));
  };

  function createRoom() {
    rs.service.createRoom(rounds);
  }

  rs.service.onJoinRoom = () => navigate('/waitinglobby');

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${((rounds - 3) * 100) / 6}% 100%`,
    };
  };

  return (
    <div>
      <p>CreateGame</p>
      <input
        type="range"
        min="3"
        max="9"
        value={rounds}
        step="2"
        onChange={handleChange}
        style={getBackgroundSize()}
      />
      Best of {rounds}
      <button type="button" onClick={() => navigate('/playwithfriend')}>
        Back
      </button>
      <button type="button" onClick={createRoom}>
        Next
      </button>
    </div>
  );
}
