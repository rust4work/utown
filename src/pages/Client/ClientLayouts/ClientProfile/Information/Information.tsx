import React from "react";
import styles from "./Information.module.scss";
import Button from "../../../../../components/Button/Button";
import Logo from "../../../../../components/Logo/Logo";
import bell from "../../../../../assets/images/icons/bell.svg";
import arrowRight from "../../../../../assets/images/arrow-right.svg";
import { useNavigateTo } from "../../../../../hooks/useNavigateTo";
import { Modal } from "antd";

function Information() {
  const { navigateTo } = useNavigateTo();
  const [modal, contextHolder] = Modal.useModal();

  const openModal = (title: string, content: string) => {
    modal.confirm({
      title,
      content,
      mask: true,
      icon: null,
      okText: "I agree",
    });
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <header className={styles.headerContainer}>
        <div className={styles.left}>
          <Button typeOfButton="backWhite" />
        </div>

        <div className={styles.logo}>
          <Logo type="white" />
        </div>

        <div className={styles.bell}>
          <img src={bell} alt="" />
        </div>
      </header>
      <main className={styles.main}>
        <h2>Information</h2>
        <div className={styles.edit}>
          <button
            className={styles.buttonWrapper}
            onClick={() =>
              openModal(
                "Privacy Policy",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              )
            }
          >
            Privacy Policy <img src={arrowRight} alt="" />
          </button>

          <button
            className={styles.buttonWrapper}
            onClick={() =>
              openModal(
                "Terms of Use",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor, urna nec commodo convallis."
              )
            }
          >
            Terms of Use <img src={arrowRight} alt="" />
          </button>
          <button
            className={styles.buttonWrapper}
            onClick={() =>
              openModal(
                "Disclaimer",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed at tortor sit amet elit viverra iaculis."
              )
            }
          >
            Disclaimer <img src={arrowRight} alt="" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default Information;
