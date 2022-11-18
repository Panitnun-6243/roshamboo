import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from 'main/service';
import GreenButton from 'renderer/components/GreenButton/GreenButton';
import './resultpage.css';

export default function ResultPage() {
  const navigate = useNavigate();
  const rs = useContext(ServiceContext);
  const { result } = rs.service;

  const playAgain = () => {
    rs.service.resetRoom();
  };

  rs.service.onResetRoom = () => navigate('/playground');

  return (
    <div>
      <h1>You {result.isWon ? 'won' : 'lost'}!</h1>
      <div className="result-container">
        <div className="player-name">You</div>
        <div className="total-score">
          {result.score[0]}:{result.score[1]}
        </div>
        <div className="player-name">Opponent</div>
      </div>
      <GreenButton name="Play again" handleClick={playAgain} width="300px" />
    </div>
  );
}
