import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import ProtectedRoute from './routes/ProtectedRoute';
import Profile from './pages/profile/Profile';
import Grados from './pages/grades/Grades';
import Home from './pages/home/Home';
import Schools from './pages/schools/Schools';
import { AuthLogin } from './pages/auth/AuthLogin';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthCallback from './pages/auth/authCallback';
import CreateGradoForm from './pages/grades/components/CreateGradoForm';
import { Toaster } from 'sonner'
import AlumnosListView from './pages/grades/components/alumnosComponents/AlumnosListView';

function App() {  

  return (
    <>
      <Toaster richColors/>
      <BrowserRouter>
        <Routes>

          {/* Públicas */}
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protegidas */}
          <Route element={<ProtectedRoute />}>
          
            {/* Vistas principales de la app */}
            <Route path="/home" element={<Home />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/grades">
              <Route index element={<Grados />} />
              <Route path="create" element={<CreateGradoForm />} />
            </Route>

            <Route path="/studentList" element={<AlumnosListView />} />

            <Route path="/schools" element={<Schools />} />

            {/* fallback protegido */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
