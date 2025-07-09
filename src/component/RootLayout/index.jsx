// import { Outlet } from "react-router-dom"
import NavBar from "../NavBar";
// import Footer from "../Footer";


const RootLayout = () => {

    return <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
}
export default RootLayout;