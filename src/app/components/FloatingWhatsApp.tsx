export default function FloatingWhatsApp() {
  return (
    <a
      aria-label="Chat on WhatsApp"
      className="fixed right-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-[110] inline-flex items-center sm:bottom-5 sm:right-5"
      href="https://wa.me/919266790357"
      rel="noopener noreferrer"
      target="_blank"
      title="+91 92667 90357"
      style={{
        height: "44px",
        gap: "8px",
        padding: "0 10px",
        borderRadius: "999px",
        background: "linear-gradient(135deg,#0f7f78 0%,#1ea78d 55%,#118a79 100%)",
        color: "#ffffff",
        textDecoration: "none",
        boxShadow: "0 10px 24px rgba(11,46,63,0.28)",
        fontFamily: "Inter, sans-serif",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: 1,
      }}
    >
      <span
        className="inline-flex items-center justify-center"
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "999px",
          border: "2px solid #ffffff",
          flexShrink: 0,
        }}
      >
        <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.52 3.48A11.8 11.8 0 0 0 12.12 0C5.58 0 .24 5.34.24 11.88c0 2.1.54 4.14 1.62 5.94L0 24l6.36-1.68a11.95 11.95 0 0 0 5.76 1.44h.06c6.54 0 11.88-5.34 11.88-11.88 0-3.18-1.26-6.18-3.54-8.4Zm-8.34 18.3h-.06a9.9 9.9 0 0 1-5.04-1.38l-.36-.24-3.78.96 1.02-3.66-.24-.36a9.9 9.9 0 0 1-1.56-5.22c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.1 1.02 6.96 2.88a9.8 9.8 0 0 1 2.88 7.02c0 5.46-4.44 9.9-9.72 9.9Zm5.58-7.38c-.3-.18-1.8-.9-2.1-1.02-.24-.06-.42-.12-.6.18s-.66 1.02-.84 1.2c-.12.18-.3.24-.6.06-.3-.18-1.2-.42-2.34-1.5-.84-.72-1.44-1.62-1.62-1.92-.18-.3 0-.42.12-.6.12-.12.3-.3.42-.48.12-.18.18-.3.3-.48.06-.18 0-.36-.06-.54-.06-.12-.6-1.5-.9-2.04-.24-.6-.54-.48-.78-.48h-.54c-.18 0-.48.06-.72.36-.24.3-.96.9-.96 2.22s.96 2.58 1.08 2.76c.12.18 1.92 3 4.62 4.2.66.3 1.2.48 1.62.6.66.24 1.26.18 1.74.12.54-.06 1.8-.72 2.04-1.44.3-.72.3-1.32.24-1.44-.06-.12-.24-.18-.54-.36Z"
          />
        </svg>
      </span>
      <span className="hidden sm:inline" style={{ fontSize: "14px", fontWeight: 500, lineHeight: 1 }}>
        Chat
      </span>
    </a>
  );
}
