import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
  };

  return (
    <>
      <h2>Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}

export default Dashboard;
