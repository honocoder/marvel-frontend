import axios from "axios";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Signup = ({ setUser }) => {
  // States definitons
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  // Functions to handle changes and submit
  const handleNameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://marvel-backend-jm.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      const token = response.data.token;

      if (token) {
        setUser(token);
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.status === 409) {
        setErrorMessage("This email is already used.");
        console.log(error.response);
      }
    }
  };

  return (
    <div className="form-div">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Username" onChange={handleNameChange} />
        <input type="text" placeholder="Email" onChange={handleEmailChange} />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button type="submit" className="form-btn">
          Become a superhero
        </button>
        <Link to={"/user/login"} className="form-link">
          Already a superhero ? Log in and put your mask on !
        </Link>
      </form>
    </div>
  );
};

export default Signup;
