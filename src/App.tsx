import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./components/layouts/layout1.tsx"
import { AuthenLayout } from "./components/layouts/authenlayout.tsx"
import { LoginPage } from "./pages/login/loginpage.tsx"
import { RegisterPage } from "./pages/register/registerpage.tsx"
import { HomePage } from "./pages/home/homePage.tsx"
import { RoomDetailPage } from "./pages/room-detail/roomDetail.tsx"
function App() {

  return (
    <>
        <BrowserRouter>
          <Routes >
            <Route element={<MainLayout/>}>
              <Route path="/" element= {<HomePage/>} />
              <Route path="/room/:idRoom" element= {<RoomDetailPage/>} />
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
