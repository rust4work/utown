import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import styles from "./AdminAddCategoryPage.module.scss";
import { createAdminCategory } from "../../../api/adminCategories";

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const AdminAddCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [priority, setPriority] = useState("1");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const onCancel = () => navigate(`/admin/establishments/${id}/categories`);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    const parsedSort = Number(priority);
    if (Number.isNaN(parsedSort)) {
      setError("Priority must be a number");
      return;
    }

    if (imageBase64 && imageBase64.length > 1000) {
      setError("Image is too large for imageUrl. Please use a shorter URL.");
      return;
    }

    try {
      setSubmitting(true);

      await createAdminCategory({
        name: name.trim(),
        sort: parsedSort,
        imageUrl: imageBase64 || undefined,
      });

      navigate(`/admin/establishments/${id}/categories`);
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
          <h1 className={styles.title}>Add Category</h1>

          <div className={styles.breadcrumbs}>
            <a href="/admin" className={styles.breadcrumbLink}>
              Home
            </a>{" "}
            / <span className={styles.breadcrumbLink}>Users</span> /{" "}
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
            / <span className={styles.active}>Add Category</span>
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
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className={styles.uploadPreview} />
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
                <div className={styles.label}>Category Name</div>
                <input
                  className={styles.input}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

export default AdminAddCategoryPage;
