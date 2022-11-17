import React from 'react';
import { io, Socket } from 'socket.io-client';

export class RoshambooService {
  private endpoint: string = 'ws://localhost:8080';

  private socket: Socket;

  private _roomId!: string;

  public get roomId(): string {
    return this._roomId;
  }

  private _isLeavingRoom = false;

  public get isLeavingRoom(): boolean {
    return this._isLeavingRoom;
  }

  onJoinRoom!: () => void;

  onLeaveRoom!: () => void;

  onEndRoom!: () => void;

  onResetRoom!: () => void;

  onRoundStart!: () => void;

  onRoundEnd!: () => void;

  constructor(onConnected: (sid: string) => void) {
    this.socket = io(this.endpoint);
    this.socket.on('connect', () => {
      onConnected(this.socket.id);
      this.bindListeners();
    });
  }

  private bindListeners(): void {
    this.socket.on('join-room', (roomId) => {
      this._roomId = roomId;
      this._isLeavingRoom = false;
      this.onJoinRoom();
    });
    this.socket.on('leave-room', () => this.onLeaveRoom());
    this.socket.on('end-room', this.onEndRoom);
    this.socket.on('reset-room', this.onResetRoom);
    this.socket.on('round-start', this.onRoundStart);
    this.socket.on('round-end', this.onRoundEnd);
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  createRoom(rounds: number): void {
    this.socket.emit('create-room', { rounds });
  }

  joinRoom(roomId: string): void {
    this.socket.emit('join-room', roomId);
  }

  leaveRoom(): void {
    this._isLeavingRoom = true;
    this.socket.emit('leave-room', '');
  }
}

interface Rs {
  service: RoshambooService;
}

const ServiceContext = React.createContext<Rs>({} as Rs);
export default ServiceContext;
