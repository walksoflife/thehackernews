import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import makeRequest from "../services/makeRequest";

const Register = () => {
  const { setLoading, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { username, email, password };

    try {
      setLoading(true);
      const res = await makeRequest.post("/auth/register", data);

      if (res.status === 200) {
        navigate("/login");
      }
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error.message);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="register">
      <div className="register-container">
        <h2 className="register-title">Welcome to Blog !</h2>
        <form className="register-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          {error && <p className="register-err">{error}</p>}
        </form>
        <div className="register-btns">
          <button
            type="button"
            className="register-submit"
            onClick={handleRegister}
          >
            Register
          </button>
          <Link to="/login" className="link">
            <button className="register-login">Login</button>
          </Link>

          <button className="register-google">Continute with google</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
