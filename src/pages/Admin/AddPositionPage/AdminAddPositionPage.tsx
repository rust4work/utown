import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import styles from "./AdminAddPositionPage.module.scss";
import { createAdminDish } from "../../../api/adminDishes";

type PositionOption = {
  label: string;
  price: number;
};

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const AdminAddPositionPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState("1");
  const [options, setOptions] = useState<PositionOption[]>(
    Array.from({ length: 7 }).map((_, idx) => ({
      label: `Option ${idx + 1}`,
      price: 3000,
    }))
  );
  const [putOnHold, setPutOnHold] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [avatarBase64, setAvatarBase64] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickFile = () => fileRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    try {
      const base64 = await fileToBase64(f);
      setAvatarPreview(base64);
      setAvatarBase64(base64);
    } catch (err) {
      console.error(err);
      setError("Failed to read image");
    }
  };

  const onCancel = () => navigate(`/admin/establishments/${id}/positions`);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setSubmitting(true);

      const parsedPrice = Number(price);
      const parsedSort = Number(priority);
      const parsedCategoryId = Number(categoryId);
      const restaurantId = Number(id);

      if (!name.trim()) {
        setError("Position name is required");
        return;
      }

      if (Number.isNaN(parsedPrice)) {
        setError("Price must be a number");
        return;
      }

      if (Number.isNaN(parsedSort)) {
        setError("Priority must be a number");
        return;
      }

      if (Number.isNaN(parsedCategoryId)) {
        setError("Category ID must be a number");
        return;
      }

      if (Number.isNaN(restaurantId)) {
        setError("Restaurant ID is invalid");
        return;
      }

      if (avatarBase64 && avatarBase64.length > 1000) {
        setError("Image is too large for imageUrl. Please use a shorter URL.");
        return;
      }

      await createAdminDish({
        title: name.trim(),
        description: description.trim() || undefined,
        price: parsedPrice,
        sort: parsedSort,
        imageUrl: avatarBase64 || undefined,
        restaurantId,
        dishCategoryId: parsedCategoryId,
      });

      navigate(`/admin/establishments/${id}/positions`);
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
          <h1 className={styles.title}>Add Position</h1>

          <div className={styles.breadcrumbs}>
            <a href="/admin" className={styles.breadcrumbLink}>
              Home
            </a>{" "}
            /{" "}
            <span className={styles.breadcrumbLink}>Users</span> /{" "}
            <a href="/admin/establishments" className={styles.breadcrumbLink}>
              Establishments
            </a>{" "}
            /{" "}
            <a
              href={`/admin/establishments/${id}/positions`}
              className={styles.breadcrumbLink}
            >
              Positions
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
                aria-label="Upload image"
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="preview" className={styles.uploadPreview} />
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
                <div className={styles.label}>Position Name</div>
                <input
                  className={styles.input}
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Description</div>
                <textarea
                  className={styles.textarea}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Price</div>
                <input
                  className={styles.input}
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Category ID</div>
                <input
                  className={styles.input}
                  placeholder="Enter category ID"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Priority</div>
                <input
                  className={styles.input}
                  placeholder="1"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </label>

              <div className={styles.field}>
                <div className={styles.label}>Options</div>

                <div className={styles.optionsGrid}>
                  {options.map((opt, idx) => (
                    <div className={styles.optionRow} key={idx}>
                      <input
                        className={styles.optionName}
                        value={opt.label}
                        onChange={(e) => {
                          const next = [...options];
                          next[idx] = { ...next[idx], label: e.target.value };
                          setOptions(next);
                        }}
                      />
                      <input
                        className={styles.optionPrice}
                        value={opt.price}
                        onChange={(e) => {
                          const next = [...options];
                          next[idx] = { ...next[idx], price: Number(e.target.value) || 0 };
                          setOptions(next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Put on Hold</div>

                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={putOnHold}
                    onChange={(e) => setPutOnHold(e.target.checked)}
                  />
                  <span className={styles.slider} />
                </label>

                <div className={styles.hint}>
                  Dish remains in the menu but is unavailable for order.
                </div>
              </div>

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

export default AdminAddPositionPage;
