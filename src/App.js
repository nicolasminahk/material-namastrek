import { Route, Routes } from 'react-router-dom'
import Activitys from './views/Activitys'
import Benefits from './views/Benefits'
import Home from './views/Home'
import Profile from './views/Profile'
import TipsView from './views/TipsView'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/activitys" element={<Activitys />} />
            <Route path="/tips" element={<TipsView />} />
        </Routes>
    )
}

export default App
