import './home.css';
import PurpleButton from 'renderer/components/PurpleButton/PurpleButton';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="game-title-box">
        <div className="game-title">Roshamboo!</div>
      </div>
      <div className="button-container">
        <PurpleButton
          name="Play with friend"
          handleClick={() => {
            navigate('/playwithfriend');
          }}
        />
        <PurpleButton
          name="Play with computer"
          handleClick={() => {
            navigate('/playwithfriend');
          }}
        />
      </div>
    </div>
  );
}
