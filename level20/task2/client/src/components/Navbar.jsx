import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/collection">My Collection</Link>
          <button onClick={() => { localStorage.removeItem("user"); window.location.reload(); }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
