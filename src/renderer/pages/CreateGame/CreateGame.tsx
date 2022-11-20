import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from 'main/service';
import './creategame.css';
import GreenButton from 'renderer/components/GreenButton/GreenButton';
import Navbar from 'renderer/components/Navbar/Navbar';

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
      <Navbar
        title="Create game"
        color="linear-gradient(90.46deg, #ffb7ff 0%, #caff8a 100%)"
        handleClick={() => {
          navigate('/playwithfriend');
        }}
      />
      <div className="cg-container">
        <div className="round-container">
          <p className="round-title">Round: &nbsp; </p>
          <input
            type="range"
            min="3"
            max="9"
            value={rounds}
            step="2"
            onChange={handleChange}
            style={getBackgroundSize()}
          />
        </div>
        <div className="bor-container">
          <p className="bo-title">Best of &nbsp; </p>
          <p className="num-title">{rounds}</p>
        </div>

        <div className="create-game">
          <GreenButton
            name="Create game"
            // eslint-disable-next-line react/jsx-no-bind
            handleClick={createRoom}
            width="180px"
          />
        </div>
      </div>
    </div>
  );
}
