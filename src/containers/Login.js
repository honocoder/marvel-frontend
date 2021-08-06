import axios from "axios";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        "https://marvel-backend-jm.herokuapp.com/user/login",
        {
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
    }
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" onChange={handleEmailChange} />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Put your mask on !</button>
        <Link to={"/user/signup"}>
          Not a superhero yet ? Sign up to the Official Superhero Register.
        </Link>
      </form>
    </div>
  );
};

export default Login;
