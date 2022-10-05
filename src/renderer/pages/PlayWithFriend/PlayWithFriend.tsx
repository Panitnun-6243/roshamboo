import './playwithfriend.css';
import { useNavigate } from 'react-router-dom';
import GreenButton from 'renderer/components/GreenButton/GreenButton';
import Textfiled from 'renderer/components/Textfield/Textfiled';
import Navbar from 'renderer/components/Navbar/Navbar';

// pink: linear-gradient(90.46deg, #ffb7ff 0%, #caff8a 100%)
// purple: linear-gradient(90.46deg, #C879FF 0%, #FFB7FF 100%)

export default function PlayWithFriend() {
  const navigate = useNavigate();

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
              <Textfiled />
              <GreenButton
                name="Join game"
                handleClick={() => {
                  navigate('/');
                }}
                width="370px"
              />
            </div>
            <div className="vertical-line" />
            <div className="create-game">
              <GreenButton
                name="Create game"
                handleClick={() => {
                  navigate('/creategame');
                }}
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
