import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);

    console.log("submit!");

    setTimeout(() => {
      setLoading(false);
      navigate("/app/dashboard");
    }, 1500);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <label>Email:</label>
            <input type="text"></input>
          </div>

          <div>
            <label>Password:</label>
            <input type="password"></input>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <button type="submit">Login</button>
          )}
        </div>
      </form>
    </main>
  );
}

export default Login;
