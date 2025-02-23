import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Top Links */} 
      <div style={styles.footerLinks}>
        <a href="#" style={styles.link}>LEGAL</a>
        <span style={styles.separator}>|</span>
        <a href="#" style={styles.link}>TERMS OF USE</a>
        <span style={styles.separator}>|</span>
        <a href="#" style={styles.link}>PRIVACY POLICY</a>
        <span style={styles.separator}>|</span>
        <a href="#" style={styles.link}>CAREERS</a>
        <span style={styles.separator}>|</span>
        <a href="#" style={styles.link}>COOKIE POLICY</a>
        <span style={styles.separator}>|</span>
        <a href="#" style={styles.link}>SUPPORT</a>
        <span style={styles.separator}>|</span>
        <a href="#" style={styles.link}>CODE OF CONDUCT</a>
      </div>

      {/* Company Logos */}
      <div style={styles.footerLogos}>
        <img src="https://logos-world.net/wp-content/uploads/2022/05/Activision-Symbol.png" alt="Activision" style={styles.logo} />
        <img src="https://i.ytimg.com/vi/sHIbvIrBd00/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA0yVhDWp00KfyBbs88Cq3Es8PyNg" alt="Treyarch" style={styles.logo} />
        <img src="https://external-preview.redd.it/a9eoeZQ935MCrjQ8srFUNDhGjOUgMzEFAJGHj6KeyYg.jpg?width=640&crop=smart&auto=webp&s=5b4aadeca67f0568b341b5eb629cf321b57ddac0" alt="Sledgehammer" style={styles.logo} />
        <img src="https://cdn.phenompeople.com/CareerConnectResources/ACPUUS/images/DLE-Logo-White2-1709023761211.png" alt="Digital Legend" style={styles.logo} />
        <img src="https://i.ytimg.com/vi/UcAUAJAcfuo/maxresdefault.jpg" alt="High Moon" style={styles.logo} />
        <img src="https://cdn.mobygames.com/5fe63c36-b884-11ef-b700-02420a000116.webp" alt="Beenox" style={styles.logo} />
      </div>

      {/* ESRB & Copyright */}
      <div style={styles.footerInfo}>
        <div style={styles.esrbRating}>
          <img src="https://www.esrb.org/wp-content/themes/esrb/assets/images/seals/2022-Privacy-Certified-Kids.png" alt="ESRB Rating" style={styles.esrbImage} />
          <img src="https://www.esrb.org/wp-content/uploads/2019/04/Mature.svg" alt="Rating" style={styles.esrbImage} />
        </div>
        <p style={styles.copyright}>
          © 2025 Activision Publishing, Inc. ACTIVISION, CALL OF DUTY, CALL OF DUTY LEAGUE, MODERN WARFARE, CALL OF DUTY BLACK OPS, CALL OF DUTY WARZONE, and CALL OF DUTY VANGUARD are trademarks of Activision Publishing, Inc.
          <br />
          All other trademarks and trade names are the property of their respective owners.
          <br /><br />
          © 2025 Compass International Pictures, Inc. All Rights Reserved.
        </p>
        <button style={styles.cookieBtn}>COOKIE SETTINGS</button>
      </div>
    </footer>
  );
};

// CSS in JS with Better Styling
const styles = {
  footer: {
    background: "#000",
    color: "#fff",
    textAlign: "center",
    padding: "30px 15px",
    fontFamily: "Arial, sans-serif",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
    padding: "15px 0",
  },
  link: {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s ease-in-out",
  },
  separator: {
    color: "#666",
  },
  footerLogos: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "20px",
    justifyItems: "center",
    padding: "20px 0",
  },
  logo: {
    maxWidth: "120px",
    height: "auto",
    filter: "brightness(0.8)",
    transition: "transform 0.3s ease-in-out",
  },
  footerInfo: {
    textAlign: "center",
    padding: "20px 0",
  },
  esrbRating: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    padding: "10px 0",
  },
  esrbImage: {
    width: "60px",
    height: "auto",
    filter: "grayscale(100%)",
  },
  copyright: {
    fontSize: "12px",
    color: "#aaa",
    marginTop: "10px",
    maxWidth: "90%",
    margin: "auto",
    lineHeight: "1.5",
  },
  cookieBtn: {
    marginTop: "15px",
    background: "#222",
    color: "white",
    border: "1px solid #555",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "all 0.3s ease-in-out",
  },
};

// Hover Effects
styles.link[":hover"] = { color: "white" };
styles.cookieBtn[":hover"] = { background: "#444", borderColor: "#777" };
styles.logo[":hover"] = { transform: "scale(1.05)" };

export default Footer;


