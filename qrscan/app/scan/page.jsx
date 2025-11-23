"use client"

import { useEffect, useRef, useState } from "react"
import { BrowserMultiFormatReader } from "@zxing/browser"
import { DecodeHintType, BarcodeFormat } from "@zxing/library"

export default function QRScanner() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const readerInstance = useRef(null)
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    let stopScanner = false

    async function start() {
      setError("")
      setResult("")
      setLoading(true)

      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices()
        if (!devices.length) throw new Error("No camera found")

        const backCam = devices.find((d) => d.label.toLowerCase().includes("back"))?.deviceId || devices[0].deviceId

       const hints = new Map();

// Allowed barcode formats
hints.set(DecodeHintType.POSSIBLE_FORMATS, [
  BarcodeFormat.CODE_128,
  BarcodeFormat.QR_CODE
]);

// Additional optimization
hints.set(DecodeHintType.TRY_HARDER, true);
hints.set(DecodeHintType.ALSO_INVERTED, true);

const reader = new BrowserMultiFormatReader(hints);
        readerInstance.current = reader

        setScanning(true)

        const video = videoRef.current
        reader.decodeFromVideoDevice(backCam, video, (res, err) => {
          if (stopScanner) return
          if (res) {
            setResult(res.getText())
            stopScannerFn()
          }
        })

        const scanInterval = setInterval(() => {
          if (stopScanner || !video || !canvasRef.current) return

          const canvas = canvasRef.current
          const ctx = canvas.getContext("2d")
          if (!ctx) return

          try {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            // Draw original frame
            ctx.drawImage(video, 0, 0)

            // Try scanning rotated versions for better angle detection
            const angles = [0, 90, 180, 270]
            angles.forEach((angle) => {
              if (stopScanner) return

              ctx.save()
              ctx.translate(canvas.width / 2, canvas.height / 2)
              ctx.rotate((angle * Math.PI) / 180)
              ctx.drawImage(video, -canvas.width / 2, -canvas.height / 2)
              ctx.restore()

              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
              reader.decodeBitmap(imageData).then((decodeResult) => {
                if (decodeResult && !stopScanner) {
                  setResult(decodeResult.getText())
                  stopScannerFn()
                }
              })
            })
          } catch (e) {
            // Silently continue scanning on canvas errors
          }
        }, 500)

        return () => {
          clearInterval(scanInterval)
        }
      } catch (e) {
        setError(e.message)
        setScanning(false)
      } finally {
        setLoading(false)
      }
    }

    start()

    const stopScannerFn = () => {
      stopScanner = true
      setScanning(false)
      if (readerInstance.current) {
        readerInstance.current.reset()
      }
    }

    return () => {
      stopScannerFn()
    }
  }, [])

  const resetScanner = () => {
    setResult("")
    setError("")
    setScanning(false)
    setLoading(false)
    window.location.reload()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <div className="bg-indigo-600 p-4 sm:p-6 text-white text-center">
          <h1 className="text-xl sm:text-2xl font-bold">QR Code Scanner</h1>
          {loading && <p className="text-xs sm:text-sm mt-2 opacity-90">Initializing camera...</p>}
        </div>

        <div className="p-3 sm:p-6">
          <div className="relative rounded-xl overflow-hidden bg-black w-full aspect-square sm:aspect-video max-w-full">
            <video ref={videoRef} className="w-full h-full object-cover" muted autoPlay playsInline></video>
            <canvas ref={canvasRef} className="hidden"></canvas>

            {scanning && !result && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-56 h-56 sm:w-80 sm:h-80 border-4 border-white rounded-lg relative shadow-lg">
                  <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 border-cyan-400"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 border-cyan-400"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 border-cyan-400"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 border-cyan-400"></div>
                  <div
                    className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg animate-[scan_2s_ease-in-out_infinite]"
                    style={{ top: "50%" }}
                  ></div>
                </div>
              </div>
            )}

            {!scanning && !result && !loading && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <p className="bg-black bg-opacity-70 px-4 py-2 rounded-lg text-sm sm:text-base text-center">
                  Position QR code in frame (any angle)
                </p>
              </div>
            )}
          </div>

          {result && (
            <div className="mt-4 sm:mt-6 bg-emerald-50 p-4 sm:p-6 rounded-xl text-center border border-emerald-200">
              <p className="font-semibold text-emerald-700 text-sm sm:text-base mb-3">Scanned Successfully:</p>
              <p className="break-words text-emerald-900 text-xs sm:text-sm bg-white p-3 rounded-lg border border-emerald-100">
                {result}
              </p>
              <button
                onClick={resetScanner}
                className="mt-4 w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm sm:text-base"
              >
                Scan Another Code
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 sm:mt-6 bg-red-50 border-2 border-red-200 rounded-lg p-3 sm:p-4 text-red-700 text-center text-xs sm:text-sm">
              <p className="font-semibold mb-1">Error</p>
              <p>{error}</p>
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
  )
}
