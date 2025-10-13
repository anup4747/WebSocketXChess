export type PlayerColor = "white" | "black";

export interface JoinRoomPayload {
  roomCode: string;
  playerName: string;
}

export interface RoomCreatedPayload {
  roomCode: string;
}

export interface RoomJoinedPayload {
  roomCode: string;
  color: PlayerColor;
  players: Array<{ socketId: string; playerName: string; color: PlayerColor }>;
}

export interface PlayerJoinedPayload {
  socketId: string;
  playerName: string;
  color: PlayerColor;
}

export interface PlayerLeftPayload {
  socketId: string;
}

export interface RoomErrorPayload {
  code: "ROOM_NOT_FOUND" | "ROOM_FULL" | "INVALID_REQUEST";
  message: string;
}


