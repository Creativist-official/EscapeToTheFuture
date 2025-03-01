import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@assets/style/index.css";

import Bitritto from './bitritto';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Bitritto />
  </StrictMode>,
)
