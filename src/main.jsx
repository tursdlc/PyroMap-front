import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/index.scss'
import './styles/reset.scss'
import router from './router/index.jsx'
import { FireProvider } from './context/FireContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
  <FireProvider >
    <RouterProvider router={router} />
  </FireProvider>

  </React.StrictMode>,
)
