"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export default function BarcodeScanner({ onScan }) {
  const scanner = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let html5QrCode;

    async function startScanner() {
      if (typeof window === "undefined") return;

      await new Promise((res) => setTimeout(res, 300));

      try {
        html5QrCode = new Html5Qrcode("scanner-view");
        scanner.current = html5QrCode;

        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) {
          console.error("No cameras found");
          return;
        }

        const backCamera =
          cameras.find((cam) =>
            cam.label.toLowerCase().includes("back")
          ) ||
          cameras.find((cam) =>
            cam.label.toLowerCase().includes("environment")
          );

        const cameraId = backCamera ? backCamera.id : cameras[0].id;

        await html5QrCode.start(
          cameraId,
          {
            fps: 15,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScan(decodedText);

            // stop safely
            stopScanner();
          }
        );

        setIsRunning(true);
      } catch (err) {
        console.error("Scanner start error:", err);
      }
    }

    async function stopScanner() {
      if (!scanner.current) return;

      try {
        if (isRunning) {
          await scanner.current.stop();
          setIsRunning(false);
        }
      } catch (err) {
        console.warn("Safe stop error (ignored):", err.message);
      }
    }

    startScanner();

    return () => {
      stopScanner();
    };
  }, [onScan, isRunning]);

  return (
    <div>
      <div
        id="scanner-view"
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "300px",
          background: "#000",
          margin: "auto",
        }}
      />
    </div>
  );
}
