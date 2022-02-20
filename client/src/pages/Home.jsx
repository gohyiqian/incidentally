import main from "../assets/images/main.svg";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/HomePage";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            incident
            <span>management</span>app
          </h1>
          <h3>Bringing Order To Inventory Chaos</h3>
          <p>
            A new era in inventory and supply chain management for ship owners
            and managers. Reduces onboard task burden for engineers by utilizing
            proprietary IoT connected tablets that accurately track RFID- &
            QR-tagged spare parts.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login | Register
          </Link>
        </div>
        <img src={main} alt="incident" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Home;
