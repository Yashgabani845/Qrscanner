"use client";

import { useState } from "react";
import QRScanner from "./scan/page";
export default function ScanPage() {
  const [result, setResult] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>Scan AWB / QR</h1>

      <QRScanner onResult={setResult} />

      {result && (
        <p style={{ marginTop: 20, fontSize: 18 }}>
          <b>Scanned:</b> {result}
        </p>
      )}
    </div>
  );
}
