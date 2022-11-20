import { useNavigate } from 'react-router-dom';
import Navbar from 'renderer/components/Navbar/Navbar';
import './playerleft.css';

export default function PlayerLeft() {
  const navigate = useNavigate();
  const leaveRoom = () => navigate('/playwithfriend', { replace: true });

  return (
    <div className="playerleft-container">
      <Navbar
        title="Roshamboo!"
        color="linear-gradient(90.46deg, #C879FF 0%, #FFB7FF 100%)"
        handleClick={leaveRoom}
      />
      <div className="left-clipboard-container">
        <div className="left-clipboard">
          <p className="player-left-text">Another player has left</p>
        </div>
      </div>
    </div>
  );
}
