import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./components/Home"
import Register from "./components/Register"
import Nav from "./components/Nav";
import Login from "./components/Login"

import "./styles/App.scss"

const App = () => {


  return (
    <>
      <Nav />

      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App