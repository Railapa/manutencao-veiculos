import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { VehicleDetailPage } from './pages/VehicleDetailPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/veiculos/:id' element={<VehicleDetailPage />}></Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
