import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './Layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext'

axios.defaults.baseURL = 'http://127.0.0.1:4000'

function App() {

  
  return (
    <UserContextProvider>
      <Routes>
       <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
