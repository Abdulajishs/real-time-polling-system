import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePage from "./page/CreatePage";
import VotePage from "./page/VotePage";
import Layout from "./page/Layout";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createpoll" element={<CreatePage />} />
        <Route path="/vote/:pollId" element={<VotePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
