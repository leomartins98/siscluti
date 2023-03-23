import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import TelaCadastroAdministrador from './routes/Administrador/TelaCadastroAdministrador'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TelaCadastroAdministrador />
  </React.StrictMode>,
)
