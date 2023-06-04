import Footer from "./Footer";
import Head from 'next/head'
import Navbar from "./Navbar";
import { AuthContext } from "../hooks/AuthContext";
import {useContext} from 'react'
import { useDispatch } from "react-redux";
import { addUsertoLocal } from "../redux/slices/auth";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
    weight: ["100", "200", "300", "400", "500","600", "700", "800", "900"],
    subsets: ["cyrillic", "latin"],
    display: "swap"
})



const Layout = ({ children }) => {
    const dispatch = useDispatch()
    const { user, logout, authredux } = useContext(AuthContext);

    {user ? dispatch(addUsertoLocal(user)) : null}
    return (
<>
<Head>

   <link rel="icon" href="/logo.png"/>
        <title>Codewith_Dorell.B - Creating New Level Websites </title>
        
        <meta name="description" content="WebXwiz is a company specializing in creating websites of any type. We provide high SEO optimization, modern performance and high security." />
        
      </Head>
<div className={montserrat.className}>
    
<Navbar />
<div>
          <iframe src="//cavalryconvincing.com/watchnew?key=b90e97a3d0ec53ba62200197912fd06e" height ="50"width ="320" align-items="center" frameborder="0" scrolling="no"></iframe>
          </div>
{children}
<Footer />
</div>
</>
)};

export default Layout;

