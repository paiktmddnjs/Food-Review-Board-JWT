import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //StrictMode -> 개발환경에서 문제를 파악하고 감지하기위한 개발 전용 도구
  // <StrictMode>
    <App />
  // </StrictMode>,
)
