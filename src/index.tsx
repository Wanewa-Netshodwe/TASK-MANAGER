import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './input.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';
library.add(faUser,faLock);
ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement 
)
.render(
    <App/>
)

