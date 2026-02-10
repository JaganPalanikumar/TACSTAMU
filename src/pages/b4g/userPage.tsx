import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export function UserPage() {
  const { user, logout } = useAuth();
  // TODO Make it so that user can edit this page
  return (
    <div className="flex flex-col gap-3 p-3">
      <h1>
        Hello {user?.firstName} {user?.lastName}
      </h1>
      <Link to="/editUser" className="bg-blue-600 p-2 w-30">
        Edit User
      </Link>
      <button onClick={logout} className="bg-red-600 w-30 h-10">
        Log Out
      </button>
    </div>
  );
}
