import { Routes, Route } from "react-router-dom";
import RoomPage from "../features/pages/RoomPage";
import LoginPage from "../features/pages/LoginPage";
import "../styles/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoomPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;