import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AlgoContext from './components/utils/AlgoContext';

ReactDOM.render(
  <React.StrictMode>
    <AlgoContext>
      <App />
    </AlgoContext>
  </React.StrictMode>,
  document.getElementById("root")
);