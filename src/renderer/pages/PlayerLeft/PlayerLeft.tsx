import { useNavigate } from 'react-router-dom';
import './playerleft.css';

export default function PlayerLeft() {
  const navigate = useNavigate();
  const leaveRoom = () => navigate('/playwithfriend', { replace: true });

  return (
    <div>
      <p>Another player has left</p>
      <button type="button" onClick={leaveRoom}>
        Back
      </button>
    </div>
  );
}
