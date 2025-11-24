import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Layout from './pages/Layout';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import MyRecipe from './pages/MyRecipe';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/dashboard" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="add-recipe" element={<AddRecipe />} />
                  <Route path="my-recipes" element={<MyRecipe />} />
                </Route>
            </Routes>
        </Router>
    );
}
