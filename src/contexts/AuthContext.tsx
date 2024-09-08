import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { StorageService } from '../services/storage'
import { StorageKeys } from '../constants/enums'
import { api } from '../services/api'
import { UserDTO } from '../interfaces/user/user.dto'

interface AuthContextType {
  token: string | null
  user: UserDTO | null
  login: (token: string, user: UserDTO) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserDTO | null>(null)

  const login = (receivedToken: string, user: UserDTO) => {
    setToken(receivedToken)
    setUser(user)
    StorageService.setItem(StorageKeys.ACCESS_TOKEN, receivedToken)
    StorageService.setItem(StorageKeys.USER, user)
    api.defaults.headers['Authorization'] = `Bearer ${receivedToken}`
  }

  const logout = () => {
    StorageService.removeItem(StorageKeys.ACCESS_TOKEN)
    StorageService.removeItem(StorageKeys.USER)
    setToken(null)
    setUser(null)
    delete api.defaults.headers['Authorization']
  }

  useEffect(() => {
    const tokenStorage = StorageService.getItem<string>(
      StorageKeys.ACCESS_TOKEN
    )
    if (tokenStorage !== token && tokenStorage) {
      setToken(tokenStorage)
      const userStorage = StorageService.getItem<UserDTO>(StorageKeys.USER)
      if (userStorage) setUser(userStorage)
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
