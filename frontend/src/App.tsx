import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import RegisterSchool from './pages/RegisterSchool'
import SuperAdminDashboard from './pages/SuperAdminDashboard'
import PrincipalDashboard from './pages/PrincipalDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import ParentDashboard from './pages/ParentDashboard'
import StudentDashboard from './pages/StudentDashboard'
import SchoolPublicPage from './pages/SchoolPublicPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/school/:schoolId" element={<SchoolPublicPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterSchool />} />
      <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
      <Route path="/dashboard/principal" element={<PrincipalDashboard />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/dashboard/parent" element={<ParentDashboard />} />
    </Routes>
  )
}

export default App
