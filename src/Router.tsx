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
