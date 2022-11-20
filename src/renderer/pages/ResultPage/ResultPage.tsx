import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from 'main/service';
import GreenButton from 'renderer/components/GreenButton/GreenButton';
import Navbar from 'renderer/components/Navbar/Navbar';
import './resultpage.css';

export default function ResultPage() {
  const navigate = useNavigate();
  const rs = useContext(ServiceContext);
  const { result } = rs.service;

  const playAgain = () => {
    rs.service.resetRoom();
  };

  const leaveRoom = () => rs.service.leaveRoom();

  rs.service.onResetRoom = () => navigate('/playground');

  return (
    <div className="bg violet flex-col-100">
      <div className="flex-col-100">
        <Navbar
          title="Roshamboo!"
          color="linear-gradient(90.46deg, #C879FF 0%, #FFB7FF 100%)"
          handleClick={leaveRoom}
        />
        <div className="flex-col-100 justify-space-around align-center">
          {result.isWon ? (
            <h1 className="won-text extra-large-text">You won!</h1>
          ) : (
            <h1 className="lost-text extra-large-text">You lost!</h1>
          )}
          <div className="result-container flex-row justify-center">
            <div className="player-name large-text flex-row justify-center">
              <span>You</span>
            </div>
            <div className="total-score large-text flex-row justify-center align-center">
              <span>
                {result.score[0]} : {result.score[1]}
              </span>
            </div>
            <div className="player-name large-text flex-row justify-center">
              <span>Opponent</span>
            </div>
          </div>
          <GreenButton
            name="Play again"
            handleClick={playAgain}
            width="300px"
          />
        </div>
      </div>
    </div>
  );
}
