import { BrowserRouter, useRoutes } from 'react-router-dom'
import { Home }  from './Pages/Home'
import { NotFound } from './Pages/NotFound'
import { Login } from './Pages/Login'
import './App.css'

function App() {
 
  const AppRoutes = () => {
    let routes = useRoutes([
      {path: '/', element: <Home/>},
      {path: '/login', element: <Login/>},
      {path: '*', element: <NotFound/>}
    ])
    return routes
  }

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
