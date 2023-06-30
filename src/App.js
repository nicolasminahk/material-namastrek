import { Route, Routes } from 'react-router-dom'
import ContactForm from './components/ContactForm'
import AboutUs from './views/AboutUs'
import Activitys from './views/Activitys'
import Admin from './views/Admin'
import Benefits from './views/Benefits'
import Home from './views/Home'
import Profile from './views/Profile'
import TipsView from './views/TipsView'
import ExitView from './components/ExitView'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/activitys" element={<Activitys />} />
            <Route path="/activity" element={<ExitView />} />
            <Route path="/tips" element={<TipsView />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/form" element={<ContactForm />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    )
}

export default App
