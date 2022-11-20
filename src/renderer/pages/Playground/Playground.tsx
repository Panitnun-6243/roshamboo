/* eslint-disable no-restricted-syntax */
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceContext, { Move } from 'main/service';
import GreenButton from 'renderer/components/GreenButton/GreenButton';
import Navbar from 'renderer/components/Navbar/Navbar';
import './playground.css';

interface StatusProps {
  isHost: boolean;
  isWon: boolean | null;
  countdown: number;
  handleClick: () => void;
}

const Status = ({ isHost, isWon, countdown, handleClick }: StatusProps) => {
  if (countdown > 0) {
    return <div className="status-container">{countdown}</div>;
  }
  if (countdown === 0) {
    return <div className="status-container">Processing...</div>;
  }
  if (countdown === -1) {
    return (
      <div className="status-container">
        {isHost ? (
          <GreenButton name="Start" handleClick={handleClick} width="200px" />
        ) : (
          <h3>Waiting for host to start round...</h3>
        )}
      </div>
    );
  }

  let roundResult;

  if (isWon === null) {
    roundResult = <div className="round-result">It&rsquo;s a tie...</div>;
  } else if (isWon === true) {
    roundResult = <div className="round-result">You won!</div>;
  } else {
    roundResult = <div className="round-result">You lost!</div>;
  }

  return <div className="status-container">{roundResult}</div>;
};

export default function Playground() {
  const navigate = useNavigate();
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [stream, setStream] = useState(new MediaStream());
  const [imgSrc, setImgSrc] = useState('');
  const [countdown, setCountdown] = useState(-1);
  const [moves, setMoves] = useState([] as Move[][]);
  const rs = useContext(ServiceContext);
  const playerIndex = rs.service.isHost ? 0 : 1;
  const opponentIndex = 1 - playerIndex;
  const leaveRoom = () => rs.service.leaveRoom();

  /**
   * Streaming capabilities
   */

  const VIDEO_SIZE = { width: 600, height: 400 };
  let streamInterval: ReturnType<typeof setInterval>;

  const getSnapshot = (isHQ = false) => {
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
    if (isHQ) {
      return canvas.toDataURL().substr(22);
    }
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

  const closeCamera = () => stream.getTracks().forEach((track) => track.stop());

  rs.service.onStream = (data) => {
    if (data.sid !== rs.service.socketId) {
      setImgSrc(`data:${rs.service.streamMime};base64,${data.data}`);
    }
  };

  /**
   * Game coordination
   */

  const handleStart = () => rs.service.startRound();
  let countdownTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    function doCountdown() {
      countdownTimeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    if (countdown > 0) {
      doCountdown();
    } else if (countdown === 0) {
      clearTimeout(countdownTimeout);
      rs.service.move(getSnapshot(true));
    }
  }, [countdown]);

  const getClassName = (classIndex: number) => {
    switch (classIndex) {
      case 0:
        return 'Paper';
      case 1:
        return 'Rock';
      case 2:
        return 'Scissors';
      default:
        return 'Foul';
    }
  };

  const getClassSymbol = (classIndex: number) => {
    switch (classIndex) {
      case 0:
        return '🖐';
      case 1:
        return '✊';
      case 2:
        return '✌';
      default:
        return '❌';
    }
  };

  const countScore = (moveHistory: Move[][], index: number) => {
    let score = 0;
    for (const move of moveHistory) {
      if (move[0].class === -1 || move[1].class === -1) {
        // Foul
        score += move[index].class !== -1 ? 1 : 0;
      } else if (Math.abs(move[0].class - move[1].class) === 1) {
        // Paper-Rock, Rock-Scissors
        score += move[index].class < move[1 - index].class ? 1 : 0;
      } else {
        // Paper-Scissors
        score += move[index].class > move[1 - index].class ? 1 : 0;
      }
    }
    return score;
  };

  rs.service.onRoundStart = () => {
    setCountdown(5);
  };

  rs.service.onRoundEnd = (data: Move[]) => {
    setCountdown(-2);
    moves.push(data);
    setMoves([...moves]);
    countdownTimeout = setTimeout(() => setCountdown(-1), 3000);
  };

  rs.service.onEndRoom = () => {
    clearTimeout(countdownTimeout);
    const playerScore = countScore(moves, playerIndex);
    const opponentScore = countScore(moves, opponentIndex);
    rs.service.result = {
      isWon: playerScore > opponentScore,
      score: [playerScore, opponentScore],
    };
    setTimeout(() => {
      navigate('/result');
      closeCamera();
    }, 1000);
  };

  rs.service.onLeaveRoom = () => {
    clearInterval(streamInterval);
    closeCamera();
    if (rs.service.isLeavingRoom) {
      navigate('/playwithfriend', { replace: true });
    } else {
      navigate('/playerleft');
    }
  };

  return (
    <div className="app-container">
      <Navbar
        title="Roshamboo!"
        color="linear-gradient(90.46deg, #C879FF 0%, #FFB7FF 100%)"
        handleClick={leaveRoom}
      />
      <div className="stream-container">
        <div className="camera-stream">
          <div className="stream-state">
            <h1>You</h1>
            <div className="move-history">
              {moves
                .slice()
                .reverse()
                .map((move, i) => (
                  <span className="emoji" key={i}>
                    {getClassSymbol(move[playerIndex].class)}
                  </span>
                ))}
            </div>
          </div>
          <video ref={videoRef} />
          <canvas ref={canvasRef} />
          <div className="move-result">
            {countdown < 0 && moves.length > 0
              ? getClassName(moves[moves.length - 1][playerIndex].class)
              : '-'}
          </div>
          <div className="score">{countScore(moves, playerIndex)}</div>
        </div>
        <div className="camera-stream opponent">
          <div className="stream-state">
            <h1>Opponent</h1>
            <div className="move-history">
              {moves.map((move, i) => (
                <span className="emoji" key={i}>
                  {getClassSymbol(move[opponentIndex].class)}
                </span>
              ))}
            </div>
          </div>
          <img src={imgSrc} alt="" />
          <div className="result">
            <div className="move-result">
              {countdown < 0 && moves.length > 0
                ? getClassName(moves[moves.length - 1][opponentIndex].class)
                : '-'}
            </div>
            <div className="score">{countScore(moves, opponentIndex)}</div>
          </div>
        </div>
      </div>
      <Status
        isHost={rs.service.isHost}
        isWon={
          moves.length > 0 &&
          moves.slice(-1)[0][0].class === moves.slice(-1)[0][1].class
            ? null
            : countScore(moves.slice(-1), playerIndex) === 1
        }
        countdown={countdown}
        handleClick={handleStart}
      />
    </div>
  );
}
