import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import styles from "./AdminAddEstablishmentPage.module.scss";
import { createAdminRestaurant } from "../../../api/adminRestaurants";

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const AdminAddEstablishmentPage: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [deliveryAreas, setDeliveryAreas] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCancel = () => navigate("/admin/establishments");
  const pickFile = () => fileRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    try {
      const base64 = await fileToBase64(f);
      setImagePreview(base64);
      setImageBase64(base64);
    } catch (err) {
      console.error(err);
      setError("Failed to read image");
    }
  };

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !phone.trim() || !city.trim() || !fullAddress.trim() || !ownerId.trim()) {
      setError("Please fill: Establishment name, Phone number, City, Address, Owner ID");
      return;
    }

    const minOrder = minOrderAmount.trim() ? Number(minOrderAmount) : undefined;
    if (minOrderAmount.trim() && Number.isNaN(minOrder)) {
      setError("Minimum order must be a number");
      return;
    }

    const ownerIdValue = Number(ownerId);
    if (Number.isNaN(ownerIdValue)) {
      setError("Owner ID must be a number");
      return;
    }

    try {
      setSubmitting(true);

      await createAdminRestaurant({
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
        ownerId: ownerIdValue,
      });

      navigate("/admin/establishments");
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
          <h1 className={styles.title}>Add new establishment</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbLink}>Home</span> /{" "}
            <span className={styles.breadcrumbLink}>Users</span> /{" "}
            <a href="/admin/establishments" className={styles.breadcrumbLink}>
              Establishments
            </a>{" "}
            / <span className={styles.active}>Add</span>
          </div>
        </div>

        <form className={styles.card} onSubmit={onSubmit}>
          <div className={styles.formBlock}>
            <div className={styles.cardTop}>
              <button type="button" className={styles.uploadBox} onClick={pickFile} aria-label="Upload avatar">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className={styles.uploadPreview} />
                ) : (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 28V9" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 18L16 9L25 18" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path  d="M5 5H27"  stroke="#101828"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"/></svg>)}
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
                <div className={styles.label}>Establishment name</div>
                <input className={styles.input} placeholder="Enter name" value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Description</div>
                <textarea className={styles.textarea} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Delivery time</div>
                <input className={styles.input} placeholder="e.g. 30-45 min" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Minimum order</div>
                <input className={styles.input} placeholder="Enter amount" value={minOrderAmount} onChange={(e) => setMinOrderAmount(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Phone number</div>
                <input className={styles.input} placeholder="Enter number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Owner ID</div>
                <input className={styles.input} placeholder="Enter owner ID" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Establishment category</div>
                <input className={styles.input} placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>City</div>
                <input className={styles.input} placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Address</div>
                <input className={styles.input} placeholder="Enter address" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Delivery areas</div>
                <textarea className={styles.textarea} placeholder="Enter areas (optional)" value={deliveryAreas} onChange={(e) => setDeliveryAreas(e.target.value)} />
              </label>

              {error && <div className={styles.error}>{error}</div>}
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

export default AdminAddEstablishmentPage;
