"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function QRScanner() {
  const videoRef = useRef(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    let stopScanner = false;

    async function start() {
      setError("");
      setResult("");
      setLoading(true);

      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        if (!devices.length) throw new Error("No camera found");

        const backCam =
          devices.find((d) => d.label.toLowerCase().includes("back"))?.deviceId ||
          devices[0].deviceId;

        setScanning(true);

        reader.decodeFromVideoDevice(
          backCam,
          videoRef.current,
          (res, err) => {
            if (stopScanner) return;
            if (res) {
              setResult(res.getText());
              stopScannerFn();
            }
          }
        );
      } catch (e) {
        setError(e.message);
        setScanning(false);
      } finally {
        setLoading(false);
      }
    }

    start();

    const stopScannerFn = () => {
      stopScanner = true;
      setScanning(false);
      reader.reset();
    };

    return () => {
      stopScannerFn();
    };
  }, []);

  const resetScanner = () => {
    setResult("");
    setError("");
    setScanning(false);
    setLoading(false);
    // reload page to restart scanner
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">QR Scanner</h1>
          {loading && <p className="text-sm mt-1 opacity-80">Loading camera...</p>}
        </div>

        <div className="p-4">
          {/* Video Preview */}
          <div className="relative rounded-2xl overflow-hidden bg-black w-full aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              autoPlay
              playsInline
            ></video>

            {/* Overlay scanning box */}
            {scanning && !result && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-4 border-white rounded-xl relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
                  <div
                    className="absolute w-full h-1 bg-green-400 shadow-lg animate-[scan_2s_ease-in-out_infinite]"
                  ></div>
                </div>
              </div>
            )}

            {!scanning && !result && !loading && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <p className="bg-black bg-opacity-60 px-4 py-2 rounded-lg">
                  Waiting for camera...
                </p>
              </div>
            )}
          </div>

          {/* Scanned Result */}
          {result && (
            <div className="mt-4 bg-green-100 p-4 rounded-xl text-center">
              <p className="font-semibold text-green-700 mb-2">Scanned Result:</p>
              <p className="break-words">{result}</p>
              <button
                onClick={resetScanner}
                className="mt-4 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Scan Again
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-300 rounded-xl p-3 text-red-700 text-center">
              {error}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% {
            top: 0;
          }
          50% {
            top: calc(100% - 4px);
          }
        }
      `}</style>
    </div>
  );
}
