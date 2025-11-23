"use client";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      gap: "20px"
    }}>
      <h2>Select Scanner Type</h2>

      <button
        onClick={() => router.push("/scan")}
        style={{
          padding: "12px 20px",
          fontSize: "18px",
          borderRadius: "10px",
          border: "1px solid #007bff"
        }}
      >
        QR Scanner
      </button>

      <button
        onClick={() => router.push("/barcode")}
        style={{
          padding: "12px 20px",
          fontSize: "18px",
          borderRadius: "10px",
          border: "1px solid #28a745"
        }}
      >
        Barcode Scanner
      </button>
    </div>
  );
}
