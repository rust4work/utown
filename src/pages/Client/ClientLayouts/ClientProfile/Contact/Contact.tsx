import React, { useState } from "react";
import styles from "./Contact.module.scss";
import HeaderDark from "../../../../../components/HeaderDark/HeaderDark";
import arrowRight from "../../../../../assets/images/arrow-right.svg";
import { Modal } from "antd";

function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <HeaderDark></HeaderDark>
      <main className={styles.main}>
        <h2>Contact Support</h2>
        <div className={styles.edit}>
          <button className={styles.buttonWrapper} onClick={showModal}>
            Message on Telegram <img src={arrowRight} alt="" />
          </button>

          <button className={styles.buttonWrapper} onClick={showModal}>
            Call Mobile Phone <img src={arrowRight} alt="" />
          </button>
        </div>
      </main>
      <Modal
        title="Contact via Telegram"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>To contact us find @ripmywhite on Telegram</p>
        <p>Or call the number mentioned in the description of that user</p>
      </Modal>
    </div>
  );
}

export default Contact;
