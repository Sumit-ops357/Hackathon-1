import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-xl">Appointment Booking</h1>
        <div>
          {user ? (
            <>
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
