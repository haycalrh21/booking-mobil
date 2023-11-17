import React from "react"
import { Calendar, Clock } from "grommet"
import { FaInstagram, FaTwitter, } from "react-icons/fa";
import { PiTiktokLogoBold } from "react-icons/pi";

export const Footer = () => {

    const footerStyle = {
        position: "relative",
        bottom: "0",
        width: "100%",
        backgroundColor: "#0e5776",
        color: "#fff",
        textAlign: "center",
        padding: "1px",
        zIndex: "1000",  // Atur nilai z-index yang sesuai
      };

  return (


    <footer style={footerStyle} className="container-fluid" >

      <aside>

        <div className="md:flex">
            <div className="mb-4 ml-9 ">

            <a href="tiktok">
      <PiTiktokLogoBold  className="inline-flex shadow-lg shadow-white rounded-full" size='30' width="20px"  color="black" style={{marginLeft:'80px' ,position: 'absolute' ,mixBlendMode:'soft-light'}}/>
      </a>

        <a href="">
      <FaTwitter className="inline-flex shadow-lg shadow-white rounded-full" size='30' width="20px"  color="black" style={{position: 'absolute' ,mixBlendMode:'soft-light'}}/>
      </a>

      <a href="www.instagram.com">
      <FaInstagram className="inline-flex shadow-lg shadow-white rounded-full" size='30' width="20px"  color="black" style={{marginLeft:'40px' ,position: 'absolute' ,mixBlendMode:'soft-light'}}/>
      </a>
      </div>

               <Clock type="digital" style={{paddingLeft: '1020px'}}/>

               </div>

        <p>Copyright © 2023 - All right reserved by Bin Mahmoed Motors</p>



      </aside>

    </footer>
  );
}

export default Footer;
