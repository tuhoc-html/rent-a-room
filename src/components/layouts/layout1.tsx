import { Outlet } from "react-router-dom"
import { FootrCom } from "../footer/footercom.tsx"
import { HeaderCom } from "../header/headercom"

export const Layout1 = () => {
    return <>
        <HeaderCom />
        <main>
            <Outlet />
        </main>
        <FootrCom />

    </>
}