import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './App.css';

// Base API URL constructed from the Codespace name environment variable.
// If `REACT_APP_CODESPACE_NAME` is not set (e.g. running locally), fall back to localhost.
const BASE_API_URL = process.env.REACT_APP_CODESPACE_NAME
	? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
	: `http://localhost:8000/api/`;

// Expose for debugging in browser console and components
window.BASE_API_URL = BASE_API_URL;
console.log('BASE_API_URL ->', BASE_API_URL);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
