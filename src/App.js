// import { Container, Typography } from '@mui/material'
import { useTheme } from './ThemeContext'
import {
    BrowserRouter as Route,
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Outlet,
    RouterProvider,
} from 'react-router-dom'
import Home from './views/Home'
import UserProfile from './components/UserProfile'

function App() {
    const { theme } = useTheme()
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="/profile" element={<UserProfile />} />
            </Route>
        )
    )

    return (
        <>
            <div>
                <RouterProvider router={router} />
            </div>
        </>
    )
}

const Root = () => {
    return (
        <>
            <div>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/profile">Profile</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default App
