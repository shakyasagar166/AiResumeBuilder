// Authentication Service for Passwordless Email Login with MySQL
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1";

const STORAGE_KEYS = {
  AUTH_USER: "uncodemy_auth_user",
  AUTH_TOKEN: "uncodemy_auth_token"
};

// Seeded default admin email for quick test reference
export const PRIMARY_ALLOWED_EMAIL = "shakaysagar166@gmail.com";

/**
 * Get currently logged-in user session
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/**
 * Log in strictly using Email (Passwordless)
 * Verifies email presence directly against MongoDB database
 */
export async function loginWithEmail(email) {
  if (!email || typeof email !== "string" || !email.trim()) {
    return {
      success: false,
      message: "Please enter your registered email address."
    };
  }

  const cleanEmail = email.trim().toLowerCase();

  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return {
      success: false,
      message: "Please enter a valid email address (e.g. example@gmail.com)."
    };
  }

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: cleanEmail,
        authProvider: "EMAIL_PASSWORDLESS"
      })
    });

    if (res.ok) {
      const data = await res.json();
      const user = {
        email: data.email || cleanEmail,
        name: data.fullName || (cleanEmail === PRIMARY_ALLOWED_EMAIL ? "Sagar Shakya" : cleanEmail.split("@")[0]),
        role: data.role || "STUDENT",
        isPro: true,
        isUncodemyStudent: true,
        token: data.token || "token_" + Date.now(),
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, user.token);
      return {
        success: true,
        user,
        message: data.message || `Welcome ${user.name}! Verified Uncodemy student.`
      };
    } else {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        message:
          errData.message ||
          "Access Denied"
      };
    }
  } catch (networkErr) {
    console.error("Backend login network error:", networkErr);
    return {
      success: false,
      message:
        "⚠️ Backend Server Error: Unable to connect to backend API (http://localhost:8080). Please ensure Spring Boot and MySQL are running."
    };
  }
}

// Backward compatibility alias
export const loginWithGmail = ({ email }) => loginWithEmail(email);

/**
 * Check if an email exists in MySQL database
 */
export async function checkEmailInDb(email) {
  if (!email || !email.includes("@")) return false;
  try {
    const res = await fetch(
      `${BACKEND_BASE_URL}/auth/check?email=${encodeURIComponent(email.trim().toLowerCase())}`
    );
    if (res.ok) {
      const data = await res.json();
      return !!data.isAllowed;
    }
  } catch (e) {
    console.warn("Could not check email online:", e);
  }
  return false;
}

/**
 * Log out user and clear stored credentials
 */
export function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.setItem("resumecraft_is_pro_user", "false");
  localStorage.removeItem("resumecraft_paid_subscription");
}

/**
 * Add a new email to MySQL whitelist
 */
export async function addNewAllowedEmail(email, addedBy = "Admin") {
  if (!email || !email.includes("@")) return false;
  const clean = email.trim().toLowerCase();

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/auth/add-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: clean, addedBy })
    });
    return res.ok;
  } catch (e) {
    console.error("Error adding email to MySQL:", e);
    return false;
  }
}

/**
 * Check if a user is a verified Uncodemy student/admin in MySQL
 */
export function isUncodemyStudent(user) {
  if (!user || !user.email) return false;
  return (
    user.isUncodemyStudent === true ||
    user.role === "SUPER_ADMIN" ||
    user.role === "ADMIN" ||
    user.role === "STUDENT" ||
    user.email.toLowerCase() === PRIMARY_ALLOWED_EMAIL.toLowerCase()
  );
}
