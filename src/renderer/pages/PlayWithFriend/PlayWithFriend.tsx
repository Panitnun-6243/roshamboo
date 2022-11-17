import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from 'main/service';
import GreenButton from 'renderer/components/GreenButton/GreenButton';
import Textfield from 'renderer/components/Textfield/Textfield';
import Navbar from 'renderer/components/Navbar/Navbar';
import './playwithfriend.css';

// pink: linear-gradient(90.46deg, #ffb7ff 0%, #caff8a 100%)
// purple: linear-gradient(90.46deg, #C879FF 0%, #FFB7FF 100%)

export default function PlayWithFriend() {
  const navigate = useNavigate();
  const rs = useContext(ServiceContext);
  let roomCode = '';

  const setRoomCode = (code: string) => {
    roomCode = code;
  };
  const joinRoom = () => rs.service.joinRoom(roomCode);

  rs.service.onJoinRoom = () => navigate('/playground');

  return (
    <div>
      <div className="pwf-container">
        <Navbar
          color="linear-gradient(90.46deg, #ffb7ff 0%, #caff8a 100%)"
          handleClick={() => {
            navigate('/');
          }}
        />
        <div className="play-container">
          <div className="play-option-container">
            <div className="join-game">
              <div className="room-code-title">Room code:</div>
              <Textfield onChange={setRoomCode} />
              <GreenButton
                name="Join game"
                handleClick={joinRoom}
                width="370px"
              />
            </div>
            <div className="vertical-line" />
            <div className="create-game">
              <GreenButton
                name="Create game"
                handleClick={() => navigate('/creategame')}
                width="370px"
              />
            </div>
          </div>
          <div className="play-description-container">
            <div className="play-description">
              <p>Join someone else’s room</p>
            </div>
            <div className="play-description">
              <p>Create a room to wait for another player</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
