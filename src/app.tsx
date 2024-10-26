import React from 'react'
import LoginPage from './Pages/LoginPage.tsx'
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard.tsx'
import Layout from './layout/Layout.tsx'
function App(){
   
    return(
        <BrowserRouter>
        <Routes>
        <Route index element={<LoginPage/>} ></Route>
        <Route path='dashboard' element={<Layout/>}>
            <Route index element ={<Dashboard/>}>
            </Route>
        </Route>
        <Route path='*' element={<Navigate to={'/'}/>}></Route>
        </Routes>
        
    
   </BrowserRouter>
    )
    
}
export default App