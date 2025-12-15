function Greeting() {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>
        Hello, {user?.fullName || "user"}!
      </h2>
    </div>
  );
}

export default Greeting;
