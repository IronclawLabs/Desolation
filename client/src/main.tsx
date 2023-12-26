import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '../styles/loading.scss'
import '../styles/navs.scss'
import '../styles/menus.scss'
import {SolWallet} from "@/context/SolWallet.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SolWallet>
      <App/>
    </SolWallet>
  </React.StrictMode>,
)
