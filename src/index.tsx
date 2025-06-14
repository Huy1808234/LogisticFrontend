import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// src/index.tsx
import './styles/global.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // TẠM THỜI GỠ BỎ <React.StrictMode> ĐỂ KIỂM TRA VẤN ĐỀ MAPBOX
  // Sau khi Mapbox hoạt động, bạn có thể cân nhắc bật lại StrictMode
  // và tìm cách xử lý việc Mapbox GL JS thao tác DOM trong StrictMode.
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals