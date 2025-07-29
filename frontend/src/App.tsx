"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./Comps/Login"
import Dashboard from "./Comps/Dashboard"
import AddAgent from "./Comps/AddAgent"
import UploadCSV from "./Comps/UploadCSV"
import DistributionView from "./Comps/DistributionView"
import AppLayout from "./Comps/AppLayout"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import type { JSX } from "react" // Declare JSX variable

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-agent" element={<AddAgent />} />
            <Route path="upload" element={<UploadCSV />} />
            <Route path="distribution" element={<DistributionView />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  )
}

export default App
