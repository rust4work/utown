import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import styles from "./AdminAddClientPage.module.scss";
import { createAdminClient } from "../../../api/adminClients";
import { validateAdminClientForm } from "../../../utils/validateAdminClient";

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const AdminAddClientPage: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(""); // username
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCancel = () => navigate("/admin");
  const pickFile = () => fileRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    try {
      const base64 = await fileToBase64(f);
      setAvatarUrl(base64);
    } catch (err) {
      console.error(err);
      setError("Failed to read image");
    } finally {
      if (e.target) e.target.value = "";
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const errors = validateAdminClientForm({
      fullName,
      username: phone,
      email,
      city,
      address,
    });

    const firstError = Object.values(errors)[0];
    if (firstError) {
      setError(firstError);
      return;
    }

    try {
      setSubmitting(true);

      await createAdminClient({
        fullName: fullName.trim(),
        username: phone.trim(),
        email: email.trim(),
        city: city.trim() || undefined,
        address: address.trim() || undefined,
        avatarUrl: avatarUrl || undefined,
      });

      navigate("/admin");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Invalid input data");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.head}>
          <h1 className={styles.title}>Add new client</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbLink}>Home</span> /{" "}
            <span className={styles.breadcrumbLink}>Users</span> /{" "}
            <a href="/admin" className={styles.breadcrumbLink}>
              Clients
            </a>{" "}
            / <span className={styles.active}>Add</span>
          </div>
        </div>

        <form className={styles.card} onSubmit={onSubmit}>
          <div className={styles.formBlock}>
            <div className={styles.cardTop}>
              <button
                type="button"
                className={styles.uploadBox}
                onClick={pickFile}
                aria-label="Upload avatar"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="preview" className={styles.uploadPreview} />
                ) : (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 28V9"
                      stroke="#101828"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 18L16 9L25 18"
                      stroke="#101828"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 5H27"
                      stroke="#101828"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              <div className={styles.previewBox} />
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: "none" }}
            />

            <div className={styles.fields}>
              <label className={styles.field}>
                <div className={styles.label}>Name</div>
                <input
                  className={styles.input}
                  placeholder="Enter name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Phone number</div>
                <input
                  className={styles.input}
                  placeholder="Enter number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Email</div>
                <input
                  className={styles.input}
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>City</div>
                <input
                  className={styles.input}
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Delivery address</div>
                <input
                  className={styles.input}
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>

              {error && (
                <div style={{ color: "crimson", fontWeight: 700, marginTop: 10 }}>
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.add} disabled={submitting}>
              {submitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAddClientPage;
