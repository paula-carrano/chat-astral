import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ChatPage } from "./Pages/ChatPage";
import { Home } from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
