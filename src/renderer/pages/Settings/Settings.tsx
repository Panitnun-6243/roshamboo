import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext, { RoshambooService } from 'main/service';
import Textfield from 'renderer/components/Textfield/Textfield';
import './settings.css';

export default function Settings() {
  const navigate = useNavigate();
  const rs = useContext(ServiceContext);
  const [uri, setUri] = useState(rs.service.endpoint);

  const back = () => navigate('/', { replace: true });

  const changeEndpoint = () => {
    rs.service = new RoshambooService((_) => {}, uri);
    back();
  };

  return (
    <div>
      <p>Settings</p>
      Endpoint: <Textfield value={uri} onChange={(txt) => setUri(txt)} />
      <button type="button" onClick={back}>
        Cancel
      </button>
      <button type="button" onClick={changeEndpoint}>
        Save
      </button>
    </div>
  );
}
