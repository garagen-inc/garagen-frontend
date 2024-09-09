# Garager Frontend

Este é o frontend do aplicativo Garager, o projeto é feito em React com estilização em Tailwind CSS.  
A branch principal é `main`.

O código principal está dentro de "src".

```
/src
```

É dividida em 

- /assets<br>
Composta principalmente de imagens e ícones para uso de outros arquivos.
- /constants<br>
Arquivos com constantes para comunicação com backend.
- /contexts<br>
Com arquivo para autenticação de usuário.
- /interfaces<br>
Com interfaces definidas para objetos da database.
- /screens<br>
Com as telas própriamente implementadas.
- /services<br>
Para comunicar serviços com o backend.
- /utils<br>
Recebimento e tratamento de erro do backend.

---

# Padrões de projeto
Vamos exemplificar alguns padrões de projeto usados observando o arquivo `AuthContext.tsx` presente em https://github.com/garager-inc/garager-frontend/blob/main/src/contexts/AuthContext.tsx

1. Strategy (Comportamental)
```
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
```
O padrão Strategy foi implementado na forma como o componente `AuthProvider` gerencia diferentes estratégias de autenticação, ou seja, as funções login e logout. Essas funções encapsulam comportamentos específicos de autenticação e desautenticação, permitindo alternar entre eles conforme necessário. O sistema determina qual comportamento utilizar com base no estado da autenticação (presença de token e usuário).

2. Observer (Comportamental)
```
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
```   
O padrão Observer é observado no uso do `useEffect`, que monitora mudanças no token de autenticação armazenado. Sempre que o estado do token no armazenamento é atualizado, o componente `AuthProvider` reage automaticamente a essas alterações, atualizando o estado de autenticação da aplicação de forma dinâmica e automática. Esse comportamento garante que o estado da aplicação esteja sempre sincronizado com o estado de autenticação do usuário.

3. Facade (Estrutural)

O código que implementa o Facade é a combinação do `AuthProvider`, `AuthContext`, e os métodos `login`, `logout`, e `useEffect`.<br>
Foi utilizada a Context API para compartilhar dados relacionados à autenticação entre os componentes sem a necessidade de passar props manualmente através da árvore de componentes. O `AuthContext` atua como uma interface centralizada, seguindo o princípio do padrão Facade, ao encapsular toda a lógica de autenticação e fornecê-la de forma simplificada aos componentes filhos. Isso facilita a gestão do estado de autenticação de forma eficiente e organizada.

---

# Clonar o repositório
```
git clone https://github.com/garager-inc/garager-frontend
```
## Instalar dependências com Yarn
```
yarn
```
## Rodar o frontend com Yarn
```
yarn start
```
## Instalar dependências com npm
```
npm install
```
## Rodar o frontend
```
npm start
```
