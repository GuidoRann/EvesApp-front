import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import ProtectedRoute from './routes/ProtectedRoute';
import Profile from './pages/profile/Profile';
import Grados from './pages/grades/Grades';
import Home from './pages/home/Home';
import Schools from './pages/schools/Schools';
import { AuthLogin } from './pages/auth/AuthLogin';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthCallback from './pages/auth/authCallback';
import CreateGradoForm from './pages/grades/components/gradosComponents/CreateGradoForm';
import { Toaster } from 'sonner'
import AlumnosListView from './pages/grades/components/alumnosComponents/AlumnosListView';
import GradeDetailView from './pages/grades/components/gradosComponents/GradeDetailView';
import AlumnosDetailView from './pages/grades/components/alumnosComponents/AlumnosDetailView';
import MateriasListView from './pages/grades/components/materiasComponents/MateriasListView';
import NotasListView from './pages/grades/components/notasComponents/NotasListView';
import AsistenciasListView from './pages/grades/components/asistenciasComponents/CreateAsistenciaView';
import MaestrasListView from './pages/grades/components/maestrasComponents/MaestrasListView';

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
              <Route path="details/:gradoId" element={<GradeDetailView />} />

              {/* Vista de alumnos  */}
              <Route path=":gradoId/students" element={<AlumnosListView />} />
              <Route path=":gradoId/students/:alumnoId" element={<AlumnosDetailView />} />
              
              {/* Vista de materias */}
              <Route path=":gradoId/subject" element={<MateriasListView />} />
              
              {/* Vista de notas */}
              <Route path=":gradoId/grades" element={<NotasListView />} />
              
              {/* Vista de asistencias */}
              <Route path=":gradoId/asistences" element={<AsistenciasListView />} />
              
              {/* Vista de maestras */}
              <Route path=":gradoId/teachers" element={<MaestrasListView />} />
            </Route>

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
