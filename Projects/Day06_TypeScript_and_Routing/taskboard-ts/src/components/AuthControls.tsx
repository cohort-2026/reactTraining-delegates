import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function AuthControls() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Link
        to="/login"
        className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
      >
        Log in
      </Link>
    );
  }

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">
        Signed in as <strong className="text-gray-900">{user.name}</strong>
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        Log out
      </button>
    </div>
  );
}

export default AuthControls;