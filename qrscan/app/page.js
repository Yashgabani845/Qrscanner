"use client";
import { useState } from "react";
import QRScanner from "./scan/page";
import Html5QrScanner from "./components/qr-scanner";

export default function ScanPage() {
  const [scannerType, setScannerType] = useState("html5qr");

  return (
    <div style={{ padding: "20px" }}>
      <select
        value={scannerType}
        onChange={(e) => setScannerType(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <option value="html5qr">Html5 QR Scanner</option>
        <option value="qr">QR Scanner (Zbar / Custom)</option>
      </select>

      {scannerType === "html5qr" && <Html5QrScanner />}
      {scannerType === "qr" && <QRScanner />}
    </div>
  );
}
