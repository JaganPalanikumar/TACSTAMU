import { useAuth } from "./context/authContext";
import styles from "./b4g.module.css";

export default function Landing() {
  const { profile } = useAuth();
  // TODO Make a landing page
  return (
    <div className="flex flex-col gap-3 p-3">
      {profile?.id && <h1>Hello {profile.first_name}</h1>}
      <h1>YOU HAVE LANDED</h1>
    </div>
  );
}
