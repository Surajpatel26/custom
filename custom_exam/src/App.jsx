import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Exam from "./components/Exam";
import Result from "./components/Result";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/exam/:examId" element={<Exam />} />
     <Route path="/result" element={<><Result></Result></>}></Route>
    </Routes>
  );
}

export default App;
