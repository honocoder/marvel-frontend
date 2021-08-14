import { Link } from "react-router-dom";
import logo from "../assets/logo-marvel.png";

const Header = ({ userToken, setUser, setValue }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  return userToken ? (
    <div className="header-loggedin">
      <div className="top-bar">
        <input
          type="search"
          placeholder="Rechercher"
          onChange={handleChange}
          className="searchbar"
        />
        <Link to={"/"}>
          <img className="signed-in-logo" src={logo} alt="" />
        </Link>
        <div className="buttons">
          <div className="signout-div">
            <Link className="signout-btn" onClick={() => setUser(null)}>
              Se déconnecter
            </Link>
          </div>
        </div>
      </div>
      <div className="menu">
        <div className="menu-elem">
          <Link to={"/"} className="charac-btn">
            Personnages
          </Link>
        </div>
        <div className="menu-elem">
          <Link to={"/comics"} className="comics-btn">
            Comics
          </Link>
        </div>
        <div className="menu-elem">
          <Link className="fav-btn">Favoris</Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="header">
      <div className="top-bar">
        <input
          type="search"
          placeholder="Rechercher"
          onChange={handleChange}
          className="searchbar"
        />
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
        <div className="buttons">
          <div className="signup-div">
            <Link to={"/user/signup"} className="signup-btn">
              S'inscrire
            </Link>
          </div>
          <div className="login-div">
            <Link to={"/user/login"} className="login-btn">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
      <div className="menu">
        <div className="menu-elem">
          <Link to={"/"} className="charac-btn">
            Personnages
          </Link>
        </div>
        <div className="menu-elem">
          <Link to={"/comics"} className="comics-btn">
            Comics
          </Link>
        </div>
        <div className="menu-elem">
          <Link className="fav-btn">Favoris</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
