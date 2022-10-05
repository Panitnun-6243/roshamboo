import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

type NavIcon = {
  color: string;
  handleClick: () => void;
};

export default function Navbar({ color, handleClick }: NavIcon) {
  return (
    <div className="navbar-contrainer" style={{ background: `${color}` }}>
      <div className="navbar-icon">
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleClick} />
      </div>
      <p>Play with friend</p>
    </div>
  );
}
