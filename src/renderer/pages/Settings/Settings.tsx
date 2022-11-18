import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext, { RoshambooService } from 'main/service';
import Textfield from 'renderer/components/Textfield/Textfield';
import './settings.css';

export default function Settings() {
  const navigate = useNavigate();
  const rs = useContext(ServiceContext);
  const [uri, setUri] = useState(rs.service.endpoint);
  const [mime, setMime] = useState(rs.service.streamMime);
  const [compress, setCompress] = useState(rs.service.streamCompression);
  const [rate, setRate] = useState(rs.service.streamRate);

  const back = () => navigate('/', { replace: true });

  const handleSave = () => {
    rs.service = new RoshambooService((_) => {}, {
      endpoint: uri,
      streamMime: mime,
      streamCompression: compress,
      streamRate: rate,
    });
    back();
  };

  const handleChangeMime = (event: ChangeEvent<HTMLSelectElement>) => {
    setMime(event.target.value);
  };

  const handleChangeCompress = (event: ChangeEvent<HTMLInputElement>) => {
    setCompress(parseFloat(event.target.value));
  };

  const handleChangeRate = (event: ChangeEvent<HTMLInputElement>) => {
    setRate(parseInt(event.target.value, 10));
  };

  const getBackgroundSize = (val: number, min: number, max: number) => {
    return {
      backgroundSize: `${((val - min) * 100) / (max - min)}% 100%`,
    };
  };

  return (
    <div>
      <p>Settings</p>
      Server: <Textfield value={uri} onChange={(txt) => setUri(txt)} />
      <label htmlFor="mime">
        Stream MIME Type
        <select id="mime" value={mime} onChange={handleChangeMime}>
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp">WEBP</option>
          <option value="image/png">PNG</option>
        </select>
      </label>
      <label htmlFor="compress">
        Stream compression ratio: {compress}
        <input
          type="range"
          min="0.1"
          max="1.0"
          value={compress}
          step="0.1"
          onChange={handleChangeCompress}
          style={getBackgroundSize(compress, 0.1, 1.0)}
          id="compress"
        />
      </label>
      <label htmlFor="rate">
        Stream rate: {rate}
        <input
          type="range"
          min="50"
          max="1000"
          value={rate}
          step="50"
          onChange={handleChangeRate}
          style={getBackgroundSize(rate, 50, 1000)}
          id="compress"
        />
      </label>
      <button type="button" onClick={back}>
        Cancel
      </button>
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
