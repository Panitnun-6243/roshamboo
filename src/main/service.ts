import React from 'react';
import { io, Socket } from 'socket.io-client';

interface RoshambooServiceSettings {
  endpoint?: string;
  streamMime?: string;
  streamCompression?: number;
  streamRate?: number;
}

export class RoshambooService {
  private _endpoint: string;

  public get endpoint(): string {
    return this._endpoint;
  }

  private _streamMime: string;

  public get streamMime(): string {
    return this._streamMime;
  }

  private _streamCompression: number;

  public get streamCompression(): number {
    return this._streamCompression;
  }

  private _streamRate: number;

  public get streamRate(): number {
    return this._streamRate;
  }

  private socket: Socket;

  private _roomId!: string;

  public get roomId(): string {
    return this._roomId;
  }

  private _isLeavingRoom = false;

  public get isLeavingRoom(): boolean {
    return this._isLeavingRoom;
  }

  socketId!: string;

  onJoinRoom!: () => void;

  onLeaveRoom!: () => void;

  onEndRoom!: () => void;

  onResetRoom!: () => void;

  onRoundStart!: () => void;

  onRoundEnd!: () => void;

  onStream!: (data: any) => void;

  constructor(
    onConnected?: (sid: string) => void,
    settings: RoshambooServiceSettings = {}
  ) {
    this._endpoint = settings.endpoint || 'ws://localhost:8080';
    this._streamMime = settings.streamMime || 'image/jpeg';
    this._streamCompression = settings.streamCompression || 0.2;
    this._streamRate = settings.streamRate || 100;
    this.socket = io(this._endpoint);
    this.socket.on('connect', () => {
      onConnected?.call(this, this.socket.id);
      this.bindListeners();
      this.socketId = this.socket.id;
    });
  }

  private bindListeners(): void {
    this.socket.on('join-room', (roomId) => {
      this._roomId = roomId;
      this._isLeavingRoom = false;
      this.onJoinRoom();
    });
    this.socket.on('leave-room', () => {
      this.onLeaveRoom();
      this.onStream = () => {};
    });
    this.socket.on('end-room', this.onEndRoom);
    this.socket.on('reset-room', this.onResetRoom);
    this.socket.on('round-start', this.onRoundStart);
    this.socket.on('round-end', this.onRoundEnd);
    this.socket.on('stream', (data) => this.onStream(data));
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

  stream(data: any): void {
    this.socket.emit('stream', data);
  }
}

interface Rs {
  service: RoshambooService;
}

const ServiceContext = React.createContext<Rs>({} as Rs);
export default ServiceContext;
