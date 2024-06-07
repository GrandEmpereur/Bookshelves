import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div style={{ margin: "1rem" }}>
      <h1>Bookeed App</h1>
      <Outlet />
    </div>
  );
}

export default App;
