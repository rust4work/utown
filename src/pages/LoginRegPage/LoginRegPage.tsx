import Logo from "../../components/Logo/Logo";
import style from "./LoginRegPage.module.css";
import Button from "../../components/Button/Button";
import { useNavigateTo } from "../../hooks/useNavigateTo";

function LoginRegPage() {
  const { navigateTo } = useNavigateTo();

  return (
    <div className={style.wrapper}>
      <div className={style.logoContainer}>
        <Logo type="full" />
      </div>
      <div className={style.buttonContainer}>
        <Button
          label="Login"
          typeOfButton="primary"
          onClick={navigateTo("/login")}
        />
        <Button
          label="Register"
          typeOfButton="primary"
          onClick={navigateTo("/register")}
        />
      </div>
    </div>
  );
}

export default LoginRegPage;
