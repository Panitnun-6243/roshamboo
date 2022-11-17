import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PurpleButton from 'renderer/components/PurpleButton/PurpleButton';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import './home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="game-title-box">
        <div className="game-title">Roshamboo!</div>
      </div>
      <div className="button-container">
        <PurpleButton
          name="Play"
          handleClick={() => navigate('/playwithfriend')}
        />
      </div>
      <div className="settings-container">
        <FontAwesomeIcon icon={faGear} onClick={() => navigate('/settings')} />
      </div>
    </div>
  );
}
