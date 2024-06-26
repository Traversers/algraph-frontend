import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateGraph from "./components/CreateGraph/CreateGraph";
import GraphPreview from "./components/Graph/GraphPreview";
import StartPage from "./components/StartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Create" element={<CreateGraph />} />
        <Route path="StartPage" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
