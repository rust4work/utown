import React from "react";
import { useLocation } from "react-router-dom";
import style from "./Verification.module.scss";
import Button from "../../../../components/Button/Button";
import OtpInput from "react-otp-input";
import { useNavigateTo } from "../../../../hooks/useNavigateTo";
import { registerUser } from "../../../../api/auth";
import { RegisterPayload } from "../../../../api/auth";

function Verification() {
  const location = useLocation();
  const registerData = location.state as {
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  };
  React.useEffect(() => {
    console.log("data from register:", registerData);
  }, []);

  const { navigateTo } = useNavigateTo();
  const [otp, setOtp] = React.useState("");

  const handleComplete = async () => {
    if (otp !== "1234") {
      alert("Invalid verification code");
      return;
    }

    if (!registerData) {
      alert("Something went wrong, please register again");
      navigateTo("/register")();
      return;
    }

    try {
      const payload: RegisterPayload = {
        username: registerData.phoneNumber,
        password: registerData.password,
        firstName: "User",
        lastName: "Client",
        role: "CLIENT" as const,
      };

      const response = await registerUser(payload);
      console.log("Registered user:", response);

      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      navigateTo("/client", response)();
    } catch (e: any) {
      alert(e.message || "Registration error");
    }
  };

  const [timeLeft, setTimeLeft] = React.useState(180);

  React.useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={style.container}>
      <Button typeOfButton="back" />
      <main className={style.main}>
        <h1>Verification code</h1>
        <p className={style.paragraph}>
          Enter the verification code sent via SMS
        </p>
        <section>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus={true}
            inputType="number"
            containerStyle={style.otpContainer}
            inputStyle={style.otpInput}
          />
          <div className={style.timer}>{formatTime(timeLeft)}</div>
          <div className={style.secondTry}>
            Didn't receive the code? Try again
          </div>

          <Button
            typeOfButton="secondary"
            disabled={otp.length < 4}
            onClick={() => {
              handleComplete();
            }}
          >
            Confirm
          </Button>
        </section>
      </main>
    </div>
  );
}

export default Verification;
