import './creategame.css';
import { useNavigate } from 'react-router-dom';

export default function CreateGame() {
  const navigate = useNavigate();
  // temporary button for change page, you can delete it
  function handleClick() {
    navigate('/playwithfriend');
  }
  function handleTempNext() {
    navigate('/playground');
  }
  return (
    <div>
      <p>CreateGame</p>
      <button type="button" onClick={handleClick}>
        Back
      </button>
      <button type="button" onClick={handleTempNext}>
        Next
      </button>
    </div>
  );
}
