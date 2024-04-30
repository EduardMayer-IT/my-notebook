import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth0ProviderWithNavigate from "./auth0-provider-with-navigate.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Auth0ProviderWithNavigate>
         <App />
      </Auth0ProviderWithNavigate>
  </React.StrictMode>,
)
