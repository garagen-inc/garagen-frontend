import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './screens/auth/Login'
import { RegisterUser } from './screens/auth/RegisterUser'
import { RegisterUserWorkshop } from './screens/auth/RegisterUserWorkshop'
import { Home } from './screens/home/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registeruser',
    element: <RegisterUser />,
  },
  {
    path: '/registerworkshop',
    element: <RegisterUserWorkshop />,
  },
])

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
