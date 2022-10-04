import './purplebutton.css';

type Pbutton = {
  name: string;
  handleClick: () => void;
};

export default function PurpleButton({ name, handleClick }: Pbutton) {
  return (
    <button
      type="button"
      className="purple-button"
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      {name}
    </button>
  );
}
