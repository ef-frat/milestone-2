import Link from "next/link";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f8f8f8",
        padding: "2rem 1rem",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#555",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        {/* Footer Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
            marginBottom: "1rem",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "#333" }}>
            Home
          </Link>
          <Link href="/about" style={{ textDecoration: "none", color: "#333" }}>
            About
          </Link>
          <Link href="/contact" style={{ textDecoration: "none", color: "#333" }}>
            Contact
          </Link>
          <Link href="/privacy-policy" style={{ textDecoration: "none", color: "#333" }}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" style={{ textDecoration: "none", color: "#333" }}>
            Terms of Service
          </Link>
        </div>

        {/* Social Media Icons */}
        <div style={{ marginBottom: "1rem" }}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: "1rem" }}>
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: "1rem" }}>
            Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>

        {/* Copyright */}
        <p style={{ fontSize: "0.8rem", color: "#777" }}>
          © {new Date().getFullYear()} Shop Smart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;