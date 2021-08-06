import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logo-marvel.png";

const Header = ({ userToken, setUser }) => {
  return userToken ? (
    <div className="header-loggedin">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <input type="search" placeholder="Rechercher" />
      <div>
        <Link onClick={() => setUser(null)}>Se déconnecter</Link>
      </div>
    </div>
  ) : (
    <div className="header">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <input type="search" placeholder="Rechercher" />
      <div>
        <Link to={"/user/signup"}>S'inscrire</Link>
        <Link to={"/user/login"}>Se connecter</Link>
      </div>
    </div>
  );
};

export default Header;
