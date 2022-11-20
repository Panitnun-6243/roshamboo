import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from 'main/service';
import './waitinglobby.css';
import Navbar from 'renderer/components/Navbar/Navbar';

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
    <div className="waiting-container">
      <Navbar
        title="Roshamboo!"
        color="linear-gradient(90.46deg, #C879FF 0%, #FFB7FF 100%)"
        handleClick={leaveRoom}
      />
      <div className="clipboard-container">
        <div className="clipboard">
          <div className="room-code-id">Room code:</div>
          <div className="room-id">{rs.service.roomId}</div>
          <p>Waiting for opponent...</p>
        </div>
      </div>
    </div>
  );
}
