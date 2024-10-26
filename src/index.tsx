import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import { Provider } from 'react-redux'
import './input.css'
import {Bounce, ToastContainer} from 'react-toastify'
import {store} from './redux/store.ts'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
library.add(faUser,faLock);
ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement 
)
.render(
    <Provider store={store}>
        <App/>
        <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>

    </Provider>
)

