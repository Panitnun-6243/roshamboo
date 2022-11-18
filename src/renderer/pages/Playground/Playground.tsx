import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from 'main/service';
import GreenButton from 'renderer/components/GreenButton/GreenButton';
import Navbar from 'renderer/components/Navbar/Navbar';
import './playground.css';

export default function Playground() {
  const navigate = useNavigate();
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [stream, setStream] = useState(new MediaStream());
  const [imgSrc, setImgSrc] = useState('');
  const rs = useContext(ServiceContext);
  const leaveRoom = () => rs.service.leaveRoom();
  const VIDEO_SIZE = { width: 600, height: 450 };
  let streamInterval: ReturnType<typeof setInterval>;

  const getSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (canvas === null) {
      clearInterval(streamInterval);
      return '';
    }
    canvas.width = VIDEO_SIZE.width;
    canvas.height = VIDEO_SIZE.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, VIDEO_SIZE.width, VIDEO_SIZE.height);
    return canvas
      .toDataURL(rs.service.streamMime, rs.service.streamCompression)
      .substr(rs.service.streamMime === 'image/png' ? 22 : 23);
  };

  const getStream = async () => {
    const st = await navigator.mediaDevices
      .getUserMedia({
        video: {
          width: VIDEO_SIZE.width,
          height: VIDEO_SIZE.height,
        },
      })
      .then((stm) => {
        const video = videoRef.current;
        if (video != null) {
          video.srcObject = stm;
          video.play();
        }
        streamInterval = setInterval(() => {
          rs.service.stream(getSnapshot());
        }, rs.service.streamRate);
        return stm || new MediaStream();
      })
      .catch((err) => {
        console.error(err);
        return new MediaStream();
      });
    setStream(st);
  };

  useEffect(() => {
    getStream();
  }, []);

  rs.service.onLeaveRoom = () => {
    clearInterval(streamInterval);
    stream.getTracks().forEach((track) => track.stop());
    if (rs.service.isLeavingRoom) {
      navigate('/playwithfriend', { replace: true });
    } else {
      navigate('/playerleft');
    }
  };

  rs.service.onStream = (data) => {
    if (data.sid !== rs.service.socketId) {
      setImgSrc(`data:${rs.service.streamMime};base64,${data.data}`);
    }
  };

  return (
    <div className="app-container">
      <Navbar
        color="linear-gradient(90.46deg, #ffb7ff 0%, #caff8a 100%)"
        handleClick={leaveRoom}
      />
      <div className="stream-container">
        <div className="camera-stream">
          <div className="stream-state">
            <h1>You</h1>
            <div className="move-history">
              <i>s</i>
              <i>s</i>
              <i>s</i>
            </div>
          </div>
          <video ref={videoRef} />
          <canvas ref={canvasRef} />
        </div>
        <div className="camera-stream opponent">
          <div className="stream-state">
            <h1>Opponent</h1>
            <div className="move-history">
              <i>s</i>
              <i>s</i>
              <i>s</i>
            </div>
          </div>
          <img src={imgSrc} alt="" />
        </div>
      </div>
      <div className="status-container">
        <GreenButton name="Start" handleClick={() => {}} width="200px" />
      </div>
    </div>
  );
}
