import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Navigation } from './pages/Navigation'
import { HomePage } from './pages/HomePage'
import { ChatPage } from './pages/ChatPage'
import { BookingPage } from './pages/BookingPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { ForumPage } from './pages/ForumPage'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/booking" 
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/resources" 
                element={
                  <ProtectedRoute>
                    <ResourcesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/forum" 
                element={
                  <ProtectedRoute>
                    <ForumPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
