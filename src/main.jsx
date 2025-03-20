import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style/index.css";

import Bitritto from './Bitritto';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Bitritto />
  </StrictMode>,
)
