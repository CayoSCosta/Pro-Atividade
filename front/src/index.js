import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Menu from './Components/Menu'
import 'bootswatch/dist/sketchy/bootstrap.min.css' // Added this :boom:

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Menu />
    <div className="container">
      <App />
    </div>
  </>
)
