import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import LandingPage from './pages/Landing.jsx';
import AuthPage from './pages/Auth.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import { AuthProvider, useAuth } from './hooks/useAuth.js';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}> 
          <Route index element={<LandingPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
