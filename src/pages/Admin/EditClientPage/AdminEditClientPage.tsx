import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { getAdminClientById, updateAdminClient } from "../../../api/adminClients";
import styles from "./AdminEditClientPage.module.scss";
import { validateAdminClientForm } from "../../../utils/validateAdminClient";

const AdminEditClientPage: React.FC = () => {
  const { id } = useParams();
  const clientId = Number(id);
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [avatarUrl, setAvatarUrl] = useState<string>(""); 
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!Number.isFinite(clientId)) {
      setError("Invalid client id in URL");
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const c = await getAdminClientById(clientId);
        if (cancelled) return;

        setName(c.fullName || "");
        setPhone(c.username || "");
        setEmail(c.email || "");
        setCity(c.city || "");
        setAddress(c.address || "");

        setAvatarPreview(c.avatarUrl || "");
        setAvatarUrl(c.avatarUrl || "");
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load client");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [clientId]);

  const onCancel = () => navigate("/admin");
  const onPickImage = () => fileRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      setAvatarPreview(result);
      setAvatarUrl(result);
    };
    reader.readAsDataURL(f);
  };

  const onSave: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setError(null);

    const errors = validateAdminClientForm({
      fullName: name,
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
      setSaving(true);

      await updateAdminClient(clientId, {
        fullName: name.trim(),
        username: phone.trim(),
        email: email.trim(),
        city: city.trim() || undefined,
        address: address.trim() || undefined,
        avatarUrl: avatarUrl || undefined,
      });

      navigate("/admin");
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Invalid input data");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: 24 }}>Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.head}>
          <h1 className={styles.title}>Edit client</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbLink}>Home</span> /{" "}
            <span className={styles.breadcrumbLink}>Users</span> /{" "}
            <a href="/admin" className={styles.breadcrumbLink}>
              Clients
            </a>{" "}
            / <span className={styles.active}>Edit</span>
          </div>
        </div>

        <form className={styles.card} onSubmit={onSave}>
          <div className={styles.formBlock}>
            <div className={styles.cardTop}>
              <button type="button" className={styles.uploadBox} onClick={onPickImage}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className={styles.previewImg} />
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

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onFileChange}
              />

              <div className={styles.previewBox} />
            </div>

            <div className={styles.fields}>
              <label className={styles.field}>
                <div className={styles.label}>Name</div>
                <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Phone number</div>
                <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Email</div>
                <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>City</div>
                <input className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Delivery address</div>
                <input className={styles.input} value={address} onChange={(e) => setAddress(e.target.value)} />
              </label>
            </div>

            {error && <div style={{ color: "crimson", marginTop: 12 }}>{error}</div>}
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.add} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditClientPage;
