import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePage from "./page/CreatePage";
import VotePage from "./page/VotePage";
import Layout from "./page/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CreatePage />} />
        <Route path="/vote/:pollId" element={<VotePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
