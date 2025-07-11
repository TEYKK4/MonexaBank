import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
function App() {

  return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </Router>
)
}

export default App
