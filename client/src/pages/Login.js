import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import makeRequest from "../services/makeRequest";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      setLoading(true);
      await login(data);
      navigate("/");
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_blank"
    );

    try {
      const res = await makeRequest.get(
        `${process.env.REACT_APP_API_URL}/auth/google/callback`
      );

      console.log(res);
    } catch (error) {}
  };

  if (loading) return <Loading />;

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="login-title">Discover & Read</h2>
        <form className="login-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {error && <p className="login-err">{error}</p>}
        </form>
        <div className="login-btns">
          <button type="button" className="login-submit" onClick={handleLogin}>
            Login
          </button>
          <Link to="/register" className="link">
            <button className="login-register">Register</button>
          </Link>

          <button className="login-google">
            Continute with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
