import { lazy, Suspense, useContext } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Mainlayout from './layouts/MainLayout'
import { Context } from './contexts/AppContext'
import route from './constants/Route.constant'

const { created, login, profile, register, saved } = route

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))

const ProtectRoute = () => {
  const { isAuth } = useContext(Context)
  return isAuth ? <Outlet /> : <Navigate to={login} />
}

const InjectRoute = () => {
  const { isAuth } = useContext(Context)
  return !isAuth ? <Outlet /> : <Navigate to={'/'} />
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Mainlayout />}>
        <Route
          index
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
