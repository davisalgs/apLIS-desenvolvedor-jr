import axios from 'axios';

// API para consumir o Backend Node.js (Pacientes)
export const apiNode = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API para consumir o Backend PHP (Médicos)
export const apiPhp = axios.create({
  baseURL: 'http://localhost:8001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
