import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import iqt_logo from "../assets/images/iqt_logo.png";
import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Rolling stock <span> inspection </span>app
          </h1>
          <p>
            Rolling stock inspection apps have revolutionized railway
            maintenance by digitizing traditional paper-based inspection
            processes for trains, locomotives, and rail cars. These mobile
            applications enable maintenance crews to conduct systematic checks
            using smartphones or tablets, recording defects, capturing photos,
            and generating real-time reports directly from the field.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
