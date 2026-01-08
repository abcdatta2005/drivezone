import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import MainLayout from "./pages/MainLayout";
import Aptitude from "./pages/Aptitude";
import DSA from "./pages/DSA";
import MockInterview from "./pages/MockInterview";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH PAGES (PUBLIC) */}
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* PROTECTED APP LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<h1>Welcome!</h1>} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/mock" element={<MockInterview />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
