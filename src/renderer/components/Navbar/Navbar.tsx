import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

type NavIcon = {
  title: string;
  color: string;
  handleClick: () => void;
};

export default function Navbar({ color, handleClick, title }: NavIcon) {
  return (
    <div className="navbar-container" style={{ background: `${color}` }}>
      <div className="navbar-icon">
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleClick} />
      </div>
      <p>{title}</p>
    </div>
  );
}
