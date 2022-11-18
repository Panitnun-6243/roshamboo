import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from 'main/service';
import './waitinglobby.css';

export default function WaitingLobby() {
  const navigate = useNavigate();
  const rs = useContext(ServiceContext);

  const leaveRoom = () => {
    rs.service.leaveRoom();
    navigate('/playwithfriend', { replace: true });
  };

  rs.service.onJoinRoom = () => navigate('/playground');
  rs.service.onLeaveRoom = () => {};
  rs.service.isHost = true;

  return (
    <div>
      <p>Waiting</p>
      <button type="button" onClick={leaveRoom}>
        Back
      </button>
      Room ID: {rs.service.roomId}
    </div>
  );
}
