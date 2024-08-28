import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ProtectedRoute from "./routes";

export default function App() {

    return (
        <Router>
            <div className="min-h-screen w-screen bg-gray-100">
                <div className="min-h-full">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute element={<Dashboard/>}/>}/>
                        <Route path="/sign-in" element={<Login/>}/>
                        <Route path="/sign-up" element={<Register/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}