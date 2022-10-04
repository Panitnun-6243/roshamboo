import './greenbutton.css';

type Gbutton = {
  name: string;
  width: string;
  handleClick: () => void;
};

export default function GreenButton({ name, handleClick, width }: Gbutton) {
  return (
    <button
      type="button"
      className="green-button"
      onClick={handleClick}
      onKeyDown={handleClick}
      style={{ width: `${width}` }}
    >
      {name}
    </button>
  );
}
