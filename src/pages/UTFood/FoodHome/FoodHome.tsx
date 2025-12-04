import { useNavigateTo } from "../../../hooks/useNavigateTo";

function FoodHome() {
  const { navigateTo } = useNavigateTo();
  return (
    <div>
      <h1 onClick={navigateTo("establishments")}>Establ...</h1>
    </div>
  );
}

export default FoodHome;
