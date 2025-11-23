"use client";
import { useState } from "react";
import BarcodeScanner from "./scan/page";

export default function Page() {
  const [result, setResult] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Scan AWB / QR Code</h2>

      <BarcodeScanner onScan={(value) => setResult(value)} />

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Scanned Result:</h3>
          <div
            style={{
              padding: 10,
              background: "#eee",
              borderRadius: 6,
              wordBreak: "break-all",
            }}
          >
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
