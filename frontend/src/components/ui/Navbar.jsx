import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCart, Users, ClipboardList, Truck } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white">
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold flex items-center gap-2">
          <span className="text-xl bg-white">
            <img
              src={logo}
              className="h-20 w-20"
              alt="KubKhao restaurant logo"
            />
          </span>
          KubKhao
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="#"
              className="flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <Users size={18} />
              Users
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <ClipboardList size={18} />
              Orders
            </Link>
            <Link
              to="/deliveries"
              className="flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <Truck size={18} />
              Deliveries
            </Link>
            <Link
              to="/carts"
              className="relative flex items-center gap-1 text-sm font-medium"
            >
              <ShoppingCart size={18} />
              Cart
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="text-sm hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="hover:underline text-sm">
              Login
            </Link>
            <Link to="/signup" className="hover:underline text-sm">
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
