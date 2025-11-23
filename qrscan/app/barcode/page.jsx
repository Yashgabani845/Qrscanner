"use client";

import { useRef, useEffect, useState } from "react";
import { scanImageData, setModuleArgs } from "@undecaf/zbar-wasm";

export default function BarcodeScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);

  // Load WASM
  useEffect(() => {
    setModuleArgs({
      locateFile: (file) => `/zbar/${file}`, // ensure zbar.wasm inside /public/zbar/
    });

    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setLoading(false);
      requestAnimationFrame(tick);
    } catch (err) {
      console.error("Camera error:", err);
      setLoading(false);
    }
  };

  const tick = async () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) {
      return requestAnimationFrame(tick);
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const symbols = await scanImageData(imageData);

    if (symbols && symbols.length > 0) {
      const value = symbols[0].decode();
      setResult(value);
    }

    requestAnimationFrame(tick);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-5 border border-slate-200">
        <h2 className="text-xl font-bold text-center text-indigo-600 mb-4">
          📦 Code-128 / AWB / Barcode Scanner
        </h2>

        <div className="relative w-full rounded-xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-xl"
            muted
            playsInline
            autoPlay
          />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
              Initializing camera...
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="h    idden"></canvas>

        {result && (
          <div className="mt-5 p-4 bg-emerald-100 border border-emerald-300 rounded-xl text-center">
            <p className="text-emerald-700 font-semibold">Scanned Result</p>
            <p className="mt-2 text-lg font-bold text-emerald-900 break-words">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
