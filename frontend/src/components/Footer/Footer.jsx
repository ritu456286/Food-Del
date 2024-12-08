import { assets } from "../../assets/assets"
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, incidunt? Hic ullam, delectus consequatur enim cumque nulla ratione reprehenderit illum quis repudiandae quo, sed cupiditate maiores quasi doloremque? Quisquam, excepturi?</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delievery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-222-453-342</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ Tomato.com - All Rights Reserved.</p>
    </div>
    
  )
}

export default Footer
