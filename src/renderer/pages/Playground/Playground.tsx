import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from 'main/service';
import './playground.css';

export default function Playground() {
  const navigate = useNavigate();
  const rs = useContext(ServiceContext);
  const leaveRoom = () => rs.service.leaveRoom();

  rs.service.onLeaveRoom = () => {
    if (rs.service.isLeavingRoom) {
      navigate('/playwithfriend', { replace: true });
    } else {
      navigate('/playerleft');
    }
  };

  return (
    <div>
      <p>Playground</p>
      <button type="button" onClick={leaveRoom}>
        Back
      </button>
    </div>
  );
}
