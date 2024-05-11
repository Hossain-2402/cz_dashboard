import "./AboutUsScreen.css"
import "./Home.css"
import { Link} from "react-router-dom";

function AboutUsScreen(){
	return (
		<div className="AboutUsScreen">
			<div className="logo_header">Comfort Zone</div>
			<p className="about_us_area">
				Comfort Zone is a brand targeting the youth to provide their desired outfits.
			</p>


			<div className="footer">
			  <div className="footer_header">
			    <Link to="/" className="logo_a"></Link>
			    <div className="socials">
			      <a href="https://www.facebook.com/comfortzone.outfit" className="facebook_btn">Facebook</a>
			      <a href="https://www.instagram.com/comfortzone.outfit/" className="instagram_btn">Instagram</a>
			    </div>
			  </div>
			    <div className="line"></div>
			    <div className="copyright">© 2024 CZ. All rights reserved.</div>
			</div>

		</div>
	);
}

export default AboutUsScreen;