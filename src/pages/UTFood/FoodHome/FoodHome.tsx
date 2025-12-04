import { useNavigateTo } from "../../../hooks/useNavigateTo";
import styles from "./FoodHome.module.scss";
import map from "../../../assets/images/icons/map.svg";
import Input from "../../../components/Input/Input";
import searchNormal from "../../../assets/images/icons/search-normal.svg";

function FoodHome() {
  const { navigateTo } = useNavigateTo();
  const userAddress = JSON.parse(sessionStorage.getItem("user") || "{}");
  return (
    <div className={styles.container}>
      <div className={styles.address}>
        <img src={map} alt="" />
        <p>
          {userAddress.fullName ?? "Unknown user"} lives at{" "}
          {userAddress.defaultAddress ?? "no address"}
        </p>
      </div>
      <div className={styles.searchBar}>
        <Input
          icon={<img src={searchNormal} alt="" />}
          type="text"
          placeholder="Search for cafes, restaraunts and dishes"
          style={{
            fontSize: "18px",
            backgroundColor: "#eaeaea",
            width: "105%",
            borderRadius: "18px",
          }}
        />
      </div>
      <div>advertisement</div>
      <div>
        <h3>categories</h3>
      </div>
      <div>
        <h3 onClick={navigateTo("establishments")}>establishments</h3>
      </div>
      <div>
        <h3>fastest delivery</h3>
      </div>
      <div>
        <h3>fastest delivery</h3>
      </div>
    </div>
  );
}

export default FoodHome;
