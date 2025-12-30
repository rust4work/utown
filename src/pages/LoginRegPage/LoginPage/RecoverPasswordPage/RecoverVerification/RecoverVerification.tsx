import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./RecoverVerification.module.scss";
import Button from "../../../../../components/Button/Button";
import OtpInput from "react-otp-input";
import { useNavigateTo } from "../../../../../hooks/useNavigateTo";
import { registerUser } from "../../../../../api/auth";
import { RegisterPayload } from "../../../../../api/auth";

function Verification() {
  const location = useLocation();
  const state = location.state as { username: string };
  const registerData = location.state as {
    username: string;
    password: string;
    confirmPassword: string;
  };

  const { navigateTo } = useNavigateTo();
  const [otp, setOtp] = React.useState("");

  const handleComplete = async () => {
    if (otp !== "123456") {
      alert("Invalid verification code");
      return;
    }

    try {
      navigateTo("/new-password", {
        username: state.username,
        code: otp,
      })();
      alert("verification successful");
    } catch (e: any) {
      alert(e.message || "Navigation error");
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
    <div className={styles.container}>
      <Button typeOfButton="back" />
      <main className={styles.main}>
        <h1>Verification code</h1>
        <p className={styles.paragraph}>
          Enter the verification code sent via SMS
        </p>
        <section>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus={true}
            inputType="number"
            containerStyle={styles.otpContainer}
            inputStyle={styles.otpInput}
          />
          <div className={styles.timer}>{formatTime(timeLeft)}</div>
          <div className={styles.secondTry}>
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
