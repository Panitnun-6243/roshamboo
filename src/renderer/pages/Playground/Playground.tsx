import './playground.css';
import { useNavigate } from 'react-router-dom';

export default function Playground() {
  const navigate = useNavigate();
  // temporary button for change page, you can delete it
  function handleClick() {
    navigate('/creategame');
  }
  return (
    <div>
      <p>Playground</p>
      <button type="button" onClick={handleClick}>
        Back
      </button>
    </div>
  );
}
