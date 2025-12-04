import { useUser } from "../../utils/UserContext";

function Greeting() {
  const { user } = useUser();

  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>
        Hello, {user?.fullName || "user"}!
      </h2>
    </div>
  );
}

export default Greeting;
