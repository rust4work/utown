import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import styles from "./AdminEditEstablishmentPage.module.scss";
import { getAdminRestaurantById, updateAdminRestaurant } from "../../../api/adminRestaurants";

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const AdminEditEstablishmentPage: React.FC = () => {
  const { id } = useParams();
  const restaurantId = Number(id);
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [deliveryAreas, setDeliveryAreas] = useState("");

  useEffect(() => {
    if (!Number.isFinite(restaurantId)) {
      setError("Invalid establishment id");
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const r = await getAdminRestaurantById(restaurantId);
        if (cancelled) return;

        setTitle(r.title || "");
        setDescription(r.description || "");
        setDeliveryTime(r.deliveryTime || "");
        setMinOrderAmount(
          typeof r.minOrderAmount === "number" ? String(r.minOrderAmount) : ""
        );
        setPhone(r.phone || "");
        setCategory(r.category || "");
        setCity(r.city || r.address?.city || "");
        setFullAddress(r.fullAddress || r.address?.fullAddress || "");
        setDeliveryAreas(r.address?.area || "");

        setImagePreview(r.imageUrl || "");
        setImageBase64(r.imageUrl || "");
      } catch (e: any) {
        setError(e?.message || "Failed to load establishment");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [restaurantId]);

  const onCancel = () => navigate("/admin/establishments");

  const onPickImage = () => fileRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    try {
      const base64 = await fileToBase64(f);
      setImagePreview(base64);
      setImageBase64(base64);
    } catch {
      setError("Failed to read image");
    }
  };

  const onSave: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !phone.trim() || !city.trim() || !fullAddress.trim()) {
      setError("Please fill: Establishment name, Phone number, City, Address");
      return;
    }

    const minOrder = minOrderAmount.trim() ? Number(minOrderAmount) : undefined;
    if (minOrderAmount.trim() && Number.isNaN(minOrder)) {
      setError("Minimum order must be a number");
      return;
    }

    try {
      setSaving(true);

      await updateAdminRestaurant(restaurantId, {
        title: title.trim(),
        description: description.trim() || undefined,
        category: category.trim() || undefined,
        deliveryTime: deliveryTime.trim() || undefined,
        minOrderAmount: minOrder,
        phone: phone.trim(),
        imageUrl: imageBase64 || undefined,
        address: {
          city: city.trim(),
          fullAddress: fullAddress.trim(),
          area: deliveryAreas.trim() || undefined,
        },
      });

      navigate("/admin/establishments");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Invalid input data");
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
          <h1 className={styles.title}>Edit establishment</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbLink}>Home</span> /{" "}
            <span className={styles.breadcrumbLink}>Users</span> /{" "}
            <a href="/admin/establishments" className={styles.breadcrumbLink}>Establishments</a> /{" "}
            <span className={styles.active}>Edit</span>
          </div>
        </div>

        <form className={styles.card} onSubmit={onSave}>
          <div className={styles.formBlock}>
            <div className={styles.cardTop}>
              <button type="button" className={styles.uploadBox} onClick={onPickImage} aria-label="Upload image">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className={styles.uploadPreview} />
                ) : (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 28V9" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 18L16 9L25 18" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 5H27" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
              </button>
              <div className={styles.previewBox} />
            </div>

            <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />

            <div className={styles.fields}>
              <label className={styles.field}>
                <div className={styles.label}>Establishment name</div>
                <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Description</div>
                <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Delivery time</div>
                <input className={styles.input} value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Minimum order</div>
                <input className={styles.input} value={minOrderAmount} onChange={(e) => setMinOrderAmount(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Phone number</div>
                <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Establishment category</div>
                <input className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>City</div>
                <input className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Address</div>
                <input className={styles.input} value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Delivery areas</div>
                <textarea className={styles.textarea} value={deliveryAreas} onChange={(e) => setDeliveryAreas(e.target.value)} />
              </label>

              {error && <div style={{ color: "crimson", fontWeight: 700, marginTop: 10 }}>{error}</div>}
            </div>
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

export default AdminEditEstablishmentPage;
