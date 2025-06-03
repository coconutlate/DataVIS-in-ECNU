import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
window.React = React;     // 把 React 暴露到浏览器全局
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
