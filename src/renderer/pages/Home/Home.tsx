import './home.css';
import PurpleButton from 'renderer/components/PurpleButton/PurpleButton';

export default function Home() {
  return (
    <div className="home-container">
      <div className="game-title-box">
        <div className="game-title">Roshamboo!</div>
      </div>
      <div className="button-container">
        <PurpleButton
          name="Play with friend"
          handleClick={() => {
            console.log('Button Clicked');
          }}
        />
        <PurpleButton
          name="Play with computer"
          handleClick={() => {
            console.log('Button Clicked');
          }}
        />
      </div>
    </div>
  );
}
