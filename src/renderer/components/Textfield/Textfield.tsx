import { ChangeEvent } from 'react';
import './textfield.css';

interface Props {
  onChange: (txt: string) => void;
  value: string | null;
}

export default function Textfield({ onChange, value }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      className="room-code-tf"
      onChange={handleChange}
      value={value || ''}
    />
  );
}
