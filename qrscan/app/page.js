// "use client";
// import { useState } from "react";
// import QRScanner from "./scan/page";
// import Html5QrScanner from "./components/qr-scanner";

// export default function ScanPage() {
//   // const [scannerType, setScannerType] = useState("html5qr");

//   return (
//     // <div style={{ padding: "20px" }}>
//     //   <select
//     //     value={scannerType}
//     //     onChange={(e) => setScannerType(e.target.value)}
//     //     style={{
//     //       padding: "8px",
//     //       borderRadius: "8px",
//     //       border: "1px solid #ccc",
//     //       marginBottom: "20px",
//     //     }}
//     //   >
//     //     <option value="html5qr">Html5 QR Scanner</option>
//     //     <option value="qr">QR Scanner (Zbar / Custom)</option>
//     //   </select>

//       // {scannerTyp  e === "html5qr" && <Html5QrScanner />}
//       // {scannerType === "qr" && 
//         <QRScanner />
//     //   }
//     // </div>
//   );
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "./components/header"
import HeroSection from "./components/hero-section"
import FeaturesSection from "./components/features-section"
import TrackingCard from "./components/tracking-card"

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <FeaturesSection />

        {/* Main Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            What Can We Help You With?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Track Return Orders */}
            <Link href="/track-return" className="block">
              <TrackingCard
                title="Track Your Return Orders"
                description="Easily track the status of your return orders across Amazon, Meesho, Flipkart, and more platforms"
                icon="📦"
                gradient="from-blue-500 to-cyan-500"
              />
            </Link>

            {/* Check Refund Status */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-200 dark:border-slate-700">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Check Refund Status</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Monitor your refund progress and get updates on when your money will be credited back to your account
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold">
                Coming Soon
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
              Why Choose EcomHelper?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Fast & Easy</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track all your orders in seconds with our simple interface
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Secure & Safe</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data is encrypted and protected with industry standards
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                  <span className="text-3xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">All Platforms</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Support for Amazon, Meesho, Flipkart and more ecommerce platforms
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">&copy; 2025 EcomHelper. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Making ecommerce shopping hassle-free</p>
        </div>
      </footer>
    </div>
  )
}

