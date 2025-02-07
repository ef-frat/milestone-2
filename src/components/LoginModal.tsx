import React, { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      window.alert("Please enter both email and password");
      return;
    }
    onSuccess();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.loginButton}>
              Login
            </button>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

const styles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  loginButton: {
    backgroundColor: "#5bc0de",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};