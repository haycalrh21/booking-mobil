import React from "react"

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
    <footer style={footerStyle} className="container-fluid">
      <aside>
        <p>Copyright © 2023 - All right reserved by Bin Mahmoed Motors</p>
      </aside>
    </footer>
  );
}

export default Footer;
