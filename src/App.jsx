import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
