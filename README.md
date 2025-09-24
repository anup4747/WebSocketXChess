# Chess Game with React and WebSocket

[Screencast from 07-21-2025 08:20:31 PM.webm](https://github.com/user-attachments/assets/ed63c6bb-031c-40c5-bd33-94fd19fb3db1)

A real-time multiplayer chess game built with React for the frontend and WebSocket for real-time communication, allowing friends to create or join rooms and play chess online. The project also supports offline play and includes a modular component structure for a seamless user experience.
Table of Contents

## Technologies

Frontend: React, TypeScript, Tailwind CSS

Real-Time Communication: WebSocket (client-side via useWebSocket hook)

Routing: React Router for navigation between pages (Menu, PlayWithFriend, PlayOffline, RoomMenu)

State Management: React Context (or optional Zustand/Redux for scalability)

Build Tool: Vite (or Create React App, depending on your setup)

CDN Dependencies: React, React DOM

## Setup Instructions
Prerequisites

Node.js (v16 or higher)
npm 
A WebSocket server (see WebSocket Server section for details)

## Installation

Clone the Repository:

```git clone https://github.com/anup4747/WebSocketXChess.git```

```cd client```

Install Dependencies for frontend:

```npm install```

```cd client```

Install Dependencies for Websocket:

```cd server```

```npm install```

Run the frontend

```cd client```

```npm run dev```

Run the websicket

```cd server```

```npm start```


