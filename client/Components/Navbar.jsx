import { useNavigate } from "react-router-dom";


export default function Navbar({ sessionActive }) {
  const Navigate=useNavigate();
  function handleLogOut(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("thoughts");
    Navigate("/login");
  }
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a href="/" className="nav-link active text-white">
          <h1 className="navbar-brand">Thoughts</h1>
        </a>
        <ul className="navbar nav">
          {!sessionActive && (
            <>
              <li className="nav-item">
                <a href="/login" className="nav-link active text-white">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a href="/signup" className="nav-link active text-white">
                  Sign Up
                </a>
              </li>
            </>
          )}
          {sessionActive && (
            <li className="nav-item">
              <button onClick={handleLogOut} className="btn btn-dark w-100 logoutButton">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
