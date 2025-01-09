import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup.jsx'
// import './App.css'
import './Signup.css'
import './expense.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login.jsx'
import Home from './Home.jsx'
import Expense from './expense.jsx'
import Summary from './summary.jsx'
import Task from './task.jsx'
import StartPage from './startPage.jsx'

function App() {

  return (
   <>
   
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/expense' element={<Expense />}></Route>
      <Route path='/summary' element={<Summary />}></Route>
      <Route path='/task' element={<Task />}></Route>
      <Route path='/' element={<StartPage />}></Route>
    </Routes>
    </BrowserRouter>

    {/* <div>
    <StartPage/>
   </div> */}
    </>
  );
}

export default App
