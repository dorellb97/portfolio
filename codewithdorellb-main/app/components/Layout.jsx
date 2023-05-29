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
        <meta name="google-site-verification" content="F5p8KmxlsIE2HtKxI9-wL9AnENChWbYL0Ai0sX-Qckk" />
      </Head>
<div className={montserrat.className}>
    
<Navbar />
{children}
<Footer />
</div>
</>
)};

export default Layout;

