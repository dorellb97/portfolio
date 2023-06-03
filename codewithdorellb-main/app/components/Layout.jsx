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
<script type="text/javascript">
	atOptions = {
		'key' : 'fbfe14d99dd78af78f889fa9e7198342',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}};
	document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.profitabledisplaynetwork.com/fbfe14d99dd78af78f889fa9e7198342/invoke.js"></scr' + 'ipt>');
</script>

   <link rel="icon" href="/logo.png"/>
        <title>Codewith_Dorell.B - Creating New Level Websites </title>
        
        <meta name="description" content="WebXwiz is a company specializing in creating websites of any type. We provide high SEO optimization, modern performance and high security." />
      </Head>
<div className={montserrat.className}>
    
<Navbar />
{children}
<Footer />
</div>
</>
)};

export default Layout;

