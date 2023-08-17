import React from "react";
import "./App.css";
import Create from "./components/Create";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";
import Group from "./components/Group";
import EditGroup from "./components/EditGroup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/edit/:id" element={<Update />} />
          <Route path="/group" element={<Group />} />
          <Route path="/group/:id" element={<EditGroup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
