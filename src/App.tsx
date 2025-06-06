import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import CreateEvent from './pages/CreateEvent';
import JoinEvent from './pages/JoinEvent';
import PhotoBooth from './pages/PhotoBooth';
import MyHub from './pages/MyHub';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './contexts/AuthContext';
// import { EventProvider } from './contexts/EventContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <EventProvider> */}
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
          <Navbar />
          <main className="container mx-auto px-4 py-2">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-event" element={
                <PrivateRoute>
                  <CreateEvent />
                </PrivateRoute>
              } />
              <Route path="/join/:eventId?" element={<JoinEvent />} />
              <Route path="/photo-booth/:eventId" element={<PhotoBooth />} />
              <Route path="/my-hub" element={
                <PrivateRoute>
                  <MyHub />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <PrivateRoute >
                  <AdminPanel />
                </PrivateRoute>
              } />
            </Routes>
          </main>
        </div>
        {/* </EventProvider> */}
      </AuthProvider>
    </Router>
  );
}

export default App;