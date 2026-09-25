import { Link, useSearchParams } from "react-router";
import { useAuth } from "../auth/useAuth";

// The open tab lives in the URL (?tab=...), so a link such as
// /settings?tab=notifications opens straight onto that tab.
export default function Settings() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "notifications" ? "notifications" : "profile";

  return (
    <section>
      <h1>Settings</h1>
      <p>
        <Link to="?tab=profile">Profile</Link> · <Link to="?tab=notifications">Notifications</Link>
      </p>
      {tab === "profile" ? (
        <>
          <h2>Profile</h2>
          <p>Email: {user?.email}</p>
        </>
      ) : (
        <>
          <h2>Notifications</h2>
          <p>Email me when a task is assigned to me.</p>
        </>
      )}
    </section>
  );
}
