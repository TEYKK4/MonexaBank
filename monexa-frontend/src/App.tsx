import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import LandingPage from "@/pages/LandingPage.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import ProtectedRoute from "@/context/ProtectedRoute.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
