export type AdminClientForm = {
  fullName: string;
  username: string; // phone
  email: string;
  city?: string;
  address?: string;
};

export function validateAdminClientForm(v: AdminClientForm) {
  const errors: Partial<Record<keyof AdminClientForm, string>> = {};

  const name = v.fullName.trim();
  const phone = v.username.trim();
  const email = v.email.trim();

  if (name.length < 2) errors.fullName = "Name must be at least 2 characters";
  if (name.length > 80) errors.fullName = "Name is too long";

  if (!/^[0-9+()\-\s]{6,20}$/.test(phone)) {
    errors.username = "Phone number is invalid";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email is invalid";
  }

  if (v.city && v.city.trim().length > 50) errors.city = "City is too long";
  if (v.address && v.address.trim().length > 200) errors.address = "Address is too long";

  return errors;
}