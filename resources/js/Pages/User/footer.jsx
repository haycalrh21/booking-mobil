import React from "react"
import { Calendar, Clock } from "grommet"
import { FaInstagram, FaTwitter, } from "react-icons/fa";
import { PiTiktokLogoBold } from "react-icons/pi";

export const Footer = () => {


  return (


    <footer style={{
    position: "absolute",
    textAlign:'center',
    width:'100%',
    backgroundColor: "#0e5776",
    color: "#fff",
    minHeight: "calc(14% - 60px)",
    left: "0px",


    }} className="container-fluid" >

      <aside>

        <div className="flex">
            <div className="content-container">
            <a href="tiktok">
      <PiTiktokLogoBold  className="inline-flex shadow-lg shadow-white rounded-full" size='30' width="20px"  color="black" style={{marginLeft:'80px' ,position: 'absolute' ,mixBlendMode:'soft-light'}}/>
      </a>

        <a href="" >
      <FaTwitter className="inline-flex shadow-lg shadow-white rounded-full" size='30' width="20px"  color="black" style={{position: 'absolute' ,mixBlendMode:'soft-light'}}/>
      </a>

      <a href="www.instagram.com">
      <FaInstagram className="inline-flex shadow-lg shadow-white rounded-full" size='30' width="20px"  color="black" style={{marginLeft:'40px' ,position: 'absolute' ,mixBlendMode:'soft-light'}}/>
      </a>
      </div>

               </div>

        <p>Copyright © 2023 - All right reserved by Bin Mahmoed Motors</p>



      </aside>

    </footer>
  );
}

export default Footer;
