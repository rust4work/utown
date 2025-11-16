import React from "react";
import style from "./Verification.module.scss";
import Button from "../../../../components/Button/Button";
import OtpInput from "react-otp-input";
import { useNavigateTo } from "../../../../hooks/useNavigateTo";

function Verification() {
  const { navigateTo } = useNavigateTo();
  const [otp, setOtp] = React.useState("");
  const handleComplete = (code: number) => {
    console.log("Verification code entered:", code);
    navigateTo("/client")();
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
          <div className={style.timer}>02:39</div>
          <div className={style.secondTry}>
            Didn't receive the code? Try again
          </div>

          <Button
            typeOfButton="secondary"
            disabled={otp.length < 4}
            onClick={() => {
              handleComplete(Number(otp));
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
