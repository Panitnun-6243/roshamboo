import './playwithfriend.css';
import { useNavigate } from 'react-router-dom';
import GreenButton from 'renderer/components/GreenButton/GreenButton';

export default function PlayWithFriend() {
  const navigate = useNavigate();
  // temporary button for change page, you can delete it
  function handleClick() {
    navigate('/');
  }
  function handleTempNext() {
    navigate('/creategame');
  }
  return (
    <div>
      <p>PlayWithFriend</p>
      <button type="button" onClick={handleClick}>
        Back
      </button>
      <button type="button" onClick={handleTempNext}>
        Next
      </button>
      <GreenButton
        name="Create game"
        handleClick={() => {
          navigate('/playwithfriend');
        }}
        width="370px"
      />
    </div>
  );
}
