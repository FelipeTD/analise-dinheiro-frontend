import { useState } from "react";
import axios from 'axios';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:6060/auth/signin",
        JSON.stringify({ email, password }),
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.statusCode === 200) {
        setUser(response.data);
      } else if (response.data.statusCode === 500) {
        setError("Usuário ou senha inválidos");
      }

    } catch (error) {
      if (!error?.response) {
        setError("Erro ao acessar o servidor");
      }
    }

  }

  const handleLogout = async (e) => {
    e.preventDefault();
    setUser("");
    setError("");
  }

  return (
    <div className="login-form-wrap">
      {user === "" ? (
        <div>
          <h2>Login</h2>
          <form className="login-form">
            <input type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password"
              name="password"
              placeholder="Senha"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit"
              className="btn-login"
              onClick={(e) => handleLogin(e)}
            >Login</button>
          </form>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>{user.message}</h2>
          <button type="button" 
                  className="btn-login"
                  onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;