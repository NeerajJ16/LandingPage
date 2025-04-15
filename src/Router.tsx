// src/Router.tsx
<<<<<<< HEAD
=======

>>>>>>> fc6b696e6844b5a51c6f6383323a8da825c15780
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Roadmap from "./components/Roadmap";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/roadmap" element={<Roadmap />} />
    </Routes>
  );
};

export default RouterComponent;
