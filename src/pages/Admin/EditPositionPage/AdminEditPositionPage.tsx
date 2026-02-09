import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import styles from "./AdminEditPositionPage.module.scss";

type PositionRow = {
  id: number;
  name: string;
  priority: number;
  price: number;
  category: string;
  putOnHold: boolean;
  description: string;
  options: { label: string; price: number }[];
};

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const AdminEditPositionPage: React.FC = () => {
  const navigate = useNavigate();
  const { id, positionId } = useParams();
  const location = useLocation();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const passed = (location.state as any)?.position as Partial<PositionRow> | undefined;

  const initial = useMemo<PositionRow>(() => {
    const fallback: PositionRow = {
      id: Number(positionId || 0),
      name: "Position Name",
      priority: 1,
      price: 7000,
      category: "",
      putOnHold: false,
      description: "Beef, zucchini, celery, cheese, pepper, cheese edges, etc.",
      options: Array.from({ length: 7 }).map((_, idx) => ({
        label: `Option ${idx + 1}`,
        price: 3000,
      })),
    };

    if (!passed) return fallback;

    const anyPassed = passed as any;
    const options = Array.isArray(anyPassed.options) ? anyPassed.options : fallback.options;

    return {
      ...fallback,
      ...passed,
      name: anyPassed.name ?? anyPassed.title ?? fallback.name,
      putOnHold: anyPassed.putOnHold ?? anyPassed.onHold ?? fallback.putOnHold,
      options,
    };
  }, [passed, positionId]);

  const [name, setName] = useState(initial.name);
  const [description, setDescription] = useState(initial.description);
  const [price, setPrice] = useState(String(initial.price ?? ""));
  const [category, setCategory] = useState(initial.category || "");
  const [priority, setPriority] = useState(String(initial.priority ?? ""));
  const [options, setOptions] = useState(initial.options);
  const [putOnHold, setPutOnHold] = useState(Boolean(initial.putOnHold));

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [avatarBase64, setAvatarBase64] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(initial.name);
    setDescription(initial.description);
    setPrice(String(initial.price ?? ""));
    setCategory(initial.category || "");
    setPriority(String(initial.priority ?? ""));
    setOptions(initial.options);
    setPutOnHold(Boolean(initial.putOnHold));
  }, [initial]);

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

      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        priority: Number(priority),
        putOnHold,
        options: options.map((o) => ({ ...o, price: Number(o.price) })),
        imageUrl: avatarBase64 || undefined,
        establishmentId: id ? Number(id) : undefined,
        positionId: positionId ? Number(positionId) : undefined,
      };

      console.log("Edit position payload:", payload);

      navigate(`/admin/establishments/${id}/positions`);
    } catch (err: any) {
      setError(err?.message || "Invalid input data");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.head}>
          <h1 className={styles.title}>Edit Position</h1>

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
            / <span className={styles.breadcrumbLink}>{name || "Position Name"}</span>{" "}
            / <span className={styles.active}>Edit</span>
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
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Description</div>
                <textarea
                  className={styles.textarea}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Price</div>
                <input
                  className={styles.input}
                  placeholder="7,000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Category</div>
                <select
                  className={styles.select}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="pizza">Pizza</option>
                  <option value="fastfood">Fast Food</option>
                  <option value="asian">Asian</option>
                </select>
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
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditPositionPage;
