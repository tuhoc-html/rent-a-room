import { Outlet } from "react-router-dom"
import { FootrCom } from "../footer/footercom.tsx"
import { HeaderCom } from "../header/headercom"

export const MainLayout = () => {
    return <>
    <div>
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <HeaderCom />
        </div>
        <main className="h-[4000px]">
            <Outlet />
        </main>
        <FootrCom />
    </div>

    </>
}