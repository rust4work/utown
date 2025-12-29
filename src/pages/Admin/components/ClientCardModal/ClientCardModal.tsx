import React, { useState } from "react";
import styles from "./ClientCardModal.module.scss";

export type ClientCardData = {
  id: number;
  name: string;
  phone: string;
  city: string;
  address: string;
  ordersCount: number;
  avatarUrl?: string;
};

type Props = {
  open: boolean;
  client: ClientCardData | null;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: (id: number) => Promise<void> | void;
};

const ClientCardModal: React.FC<Props> = ({
  open,
  client,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!open || !client) return null;

  const avatarSrc = client.avatarUrl?.trim()
    ? client.avatarUrl
    : "/customer-img.png";

  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => {
    if (!deleting) setConfirmOpen(false);
  };

const handleDelete = async () => {
  if (!client || !onDelete) return;

  try {
    setDeleting(true);
    await onDelete(client.id);
    setConfirmOpen(false);
  } finally {
    setDeleting(false);
  }
};

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close" type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.75 5.25L5.25 18.75" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.75 18.75L5.25 5.25" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <div className={styles.top}>
          <div className={styles.avatarWrap}>
            <img className={styles.avatar} src={avatarSrc} alt={client.name} />
          </div>

          <div className={styles.rightTopPanel}>
            <div className={styles.rightTopButtons}>
              <button className={styles.editButton} onClick={onEdit} type="button" disabled={!onEdit}>
                Edit account
                <span className={styles.arrow}>
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.6665 16H25.3332" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 6.66797L25.3333 16.0013L16 25.3346" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <button className={styles.deleteButton} onClick={openConfirm} type="button" disabled={!onDelete}>
                Delete Client
                <span className={styles.arrow}>
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.6665 16H25.3332" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 6.66797L25.3333 16.0013L16 25.3346" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.leftInfo}>
            <div className={styles.customerName}>{client.name}</div>
          </div>

          <div className={styles.details}>
            <div className={styles.row}>
              <div className={styles.label}>Phone:</div>
              <div className={styles.value}>{client.phone}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>City:</div>
              <div className={styles.value}>{client.city}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Address:</div>
              <div className={styles.value}>{client.address}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Orders:</div>
              <div className={styles.value}>{client.ordersCount} orders</div>
            </div>
          </div>
        </div>

        {confirmOpen && (
          <div className={styles.confirmBackdrop} onClick={closeConfirm}>
            <div className={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
              <div className={styles.confirmTitle}>Delete client?</div>

              <button className={styles.confirmDelete} type="button" onClick={handleDelete} disabled={deleting} >
                {deleting ? "Deleting..." : "Delete"}
              </button>

              <button className={styles.confirmCancel} type="button" onClick={closeConfirm} disabled={deleting}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCardModal;