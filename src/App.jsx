import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Graph from  "./components/Graph/Graph";
import CreateGraph from "./components/CreateGraph/CreateGraph";

//EXAMPLE GRAPH DATA
const nodes = [
  { x: 50, y: 50 },
  { x: 150, y: 100 },
  { x: 250, y: 150 },
  { x: 100, y: 200 },
  { x: 200, y: 250 }
];

const edges = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1], target: nodes[2] },
  { source: nodes[2], target: nodes[3] },
  { source: nodes[3], target: nodes[4] },
  { source: nodes[4], target: nodes[0] }
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Graph" element={<Graph nodes={nodes} edges={edges} />} />
        <Route path="Create" element={<CreateGraph />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
