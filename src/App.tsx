import { HashRouter, Route, Routes } from 'react-router-dom'
import { Login } from './screens/auth/Login'
import { RegisterUser } from './screens/auth/RegisterUser'
import { RegisterUserWorkshop } from './screens/auth/RegisterUserWorkshop'
import { Home } from './screens/home/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import Workshop2 from './screens/workshop/Workshop'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registeruser" element={<RegisterUser />} />
            <Route
              path="/registerworkshop"
              element={<RegisterUserWorkshop />}
            />
            <Route path="/workshop/:workshopId" element={<Workshop2 />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
