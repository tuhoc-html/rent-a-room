import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout1 } from "./components/layouts/layout1.tsx"
import { AuthenLayout } from "./components/layouts/authenlayout.tsx"
import { LoginPage } from "./pages/login/loginpage.tsx"
import { RegisterPage } from "./pages/register/registerpage.tsx"
import { HomePage } from "./pages/home/homepage.tsx"
function App() {

  return (
    <>
        <BrowserRouter>
          <Routes >
            <Route element={<Layout1/>}>
              <Route path="/" element= {<HomePage/>} />
            </Route>
            {/* authen layout */}
            <Route element={<AuthenLayout/>}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
