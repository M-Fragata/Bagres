import { Route, Routes, BrowserRouter } from "react-router-dom"

import { SignupPage } from "./pages/signup"
import { LoginPage } from "./pages/login"
import { Schedule } from "./pages/schedule"
import { NotFoundPage } from "./pages/notFound.tsx"

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

