import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePage from "./page/CreatePage";
import VotingPage from "./page/VotingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatePage />} />
      <Route path="/voting" element={<VotingPage />} />
    </Routes>
  );
}

export default App;
