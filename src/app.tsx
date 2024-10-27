import React from 'react'
import LoginPage from './Pages/LoginPage.tsx'
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard.tsx'
import Layout from './layout/Layout.tsx'
import ChatPage from './Pages/ChatPage.tsx'
import ProfilePage from './Pages/ProfilePage.tsx'
function App(){
   
    return(
        <BrowserRouter>

    <Routes>
        <Route index element={<LoginPage/>} ></Route>
        <Route path='dashboard' element={<Layout/>}>
            <Route path='' element ={<Dashboard/>}></Route>

            <Route path='chat' element ={<ChatPage />}></Route>
            <Route path='profile' element ={<ProfilePage />}></Route>
          
        </Route>
        <Route path='*' element={<Navigate to={'/'}/>}></Route>
        </Routes>
        
    
   </BrowserRouter>
    )
    
}
export default App