
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import LandingScreen from './screens/LandingScreen';

function App() {
  return (
    <div className="App">
     <NavBar/>
     <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeScreen/>}/>
        <Route path="/book/:roomid/:startDate/:endDate" element={<BookingScreen/>}/>
        <Route path="/login" element={<LoginScreen/>}/>
        <Route path="/register" element={<RegisterScreen/>}/>
        <Route path="/profile" element={<ProfileScreen/>}/>
        <Route path="/admin" element={<AdminScreen/>}/>
        <Route path="/" element={<LandingScreen/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App;
