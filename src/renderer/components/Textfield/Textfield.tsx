import { ChangeEvent } from 'react';
import './textfield.css';

interface Props {
  onChange: (txt: string) => void;
}

export default function Textfield({ onChange }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return <input type="text" className="room-code-tf" onChange={handleChange} />;
}
