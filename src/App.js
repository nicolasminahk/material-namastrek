import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import UserProfile from './components/UserProfile'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
        </Routes>
    )
}

export default App
